import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '../utils/useQuery';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import AppLayout from '../layouts/AppLayout';
import { CommentsSection } from '../components/CommentsSection';
import { SinglePost } from '../components/post/SinglePost';
import {
    // withShowError,
    WithShowErrorInjectedProps,
} from '../utils/withShowError';
import { User, NotificationProps, ThemeType, Mode, StateData, Model } from '../logic/types';
import { QUOTES } from '../constants/data';
import { useServices } from '../services';

// TODO: see a comment in `Logout` regarding HOCs.
interface Props {
    user: User | undefined | null;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
    data: StateData;
    setStateData: any;
    addPostComment: any;
    addSprintComment: any;
    removeObject: any;
    notificationsProps: NotificationProps;
    showError: any;
    backTo: { name: string; path: string };
}

// If path is /sprints, redirect to the newest sprint
const Post = ({
    user,
    mode,
    themeType,
    setThemeType,
    setMode,
    data,
    setStateData,
    addPostComment,
    addSprintComment,
    removeObject,
    notificationsProps,
    showError,
}: Props & WithShowErrorInjectedProps) => {
    const { id }: { id: string } = useParams();
    const query = useQuery();
    let linkBack = query.get('from');
    const linkBackName = linkBack ? linkBack.substring(1, linkBack.substring(1).indexOf('/') + 1) : 'home';
    linkBack = linkBack || '/';

    const { sprints: sprints, posts: posts, comments: comments, likes: likes, users: users, projects: projects } = data;

    const [quote, setQuote] = useState('');

    /* 
        GET DATA FROM DATA BASE AND WRITE TO APP STATE
    */
    const getData = async () => {
        const { sprintsService, projectsService, usersService } = useServices()!;
        let res = await sprintsService.getAll().catch(showError);
        let resProj = await projectsService.getAll().catch(showError);
        // Temp - see comment in ComponentDidMount in App.tsx
        let users = await usersService.getAll().catch(showError);

        // TODO: Is there a better solution to handle pulling all required data
        await setStateData(res, resProj, users);
    };

    // Fetch sprints on the first render.
    // It will send a request when the user re-enters the sprints list page from some other page (e.g. form).
    // This way, the user has a way of refreshing sprints data.
    useEffect(() => {
        getData();
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, []);

    /* 
        GET CURRENT POST ID DATA FROM APP STATE
    */
    const post = posts.get(id);

    /* 
        PREPARE COMMENTS SECTION COMPONENT TO FEED TO THE RIGHT (SECONDARY) DRAWER
    */
    // Initialize state value with the ComponentsSection as undefined.
    // Once current sprint is loaded to state, set this value to the sprint comments
    // Pass the 'setCommentsSection' up to each Card component
    const [commentsProps, setCommentsProps]: any = useState(undefined);
    const commentsSection = commentsProps ? (
        <CommentsSection
            expanded={true}
            user={user}
            title={commentsProps.title}
            parentId={commentsProps.parentId}
            parentModel={commentsProps.parentModel}
            comments={(commentsProps.parentModel === 'Sprint'
                ? sprints.get(commentsProps.parentId)
                : posts.get(commentsProps.parentId)
            )?.comments.map((comment) => comments.get(comment))}
            users={data.users}
            addComment={commentsProps.addComment}
            removeComment={commentsProps.removeComment}
        />
    ) : undefined;

    // Secondary TODO: create a generic method and reuse for each drawer
    const [openSecondaryDrawer, setOpenSecondaryDrawer] = useState(false);

    const toggleSecondaryDrawer = (
        open: boolean,
        title: string,
        parentModel: Model,
        parentId: any,
        addComment: any,
        removeComment: any
    ) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        // Rewrite this logic completely
        if (open)
            setCommentsProps({
                title,
                parentModel,
                parentId,
                addComment,
                removeComment,
            });
        setOpenSecondaryDrawer(open);
    };

    /* 
        DIALOG WINDOW
    */
    //    TODO: Is it better to add it here and pass to Layout or use in single components, which require a dialog

    const styleInfo = { margin: '0, 5em' };

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            setThemeType={setThemeType}
            mode={mode}
            setMode={setMode}
            appBar={true}
            quote={quote}
            pagination={{ path: '/posts' }}
            createButton={{ name: 'Create', onClick: () => '' }}
            navPanel={{
                side: 'left',
                content: [
                    { header: 'Navigation', list: [{ id: '', name: `Back to ${linkBackName}`, path: linkBack }] },
                ],
            }}
            sideColumn={
                post
                    ? {
                          header: 'written by',
                          // TODO: Add 'about me' to user properties and display it here, if not available generate random goss
                          body: `${users.get(post.author as any)?.publicName}`,
                      }
                    : undefined
            }
            secondaryDrawer="a" // TODO: fill with comments from related object
            secondaryDrawerOpen={openSecondaryDrawer}
            secondaryDrawerContent={post ? commentsSection : undefined}
            toggleSecondaryDrawer={toggleSecondaryDrawer}
            {...notificationsProps}
        >
            {/* Render the layout even if no sprint can be shown. The user would see a blank screen otherwise. */}
            {!id ? (
                <div>I love to talk about nothing. It's the only thing I know anything about.</div>
            ) : !post ? (
                // TODO: differentiate between a wrong id and loading state - not yet known
                // TODO: Add nice loading animation
                <div style={styleInfo}>We haven't found what you were looking for...</div>
            ) : (
                // NOTE: when passing multiple props directly to the child, it's often useful not to unpack them and use the `...` operator
                <SinglePost
                    user={user}
                    themeType={themeType}
                    post={post}
                    sprints={sprints}
                    projects={projects}
                    comments={comments}
                    likes={likes}
                    users={users}
                    addPostComment={addPostComment}
                    addSprintComment={addSprintComment}
                    removeObject={removeObject}
                    toggleCommentsPanel={toggleSecondaryDrawer}
                    onError={showError}
                    // showError={showError}
                />
            )}
        </AppLayout>
    );
};

// export default (withShowError as any)(Sprint);
export default authenticatedPage(withPush(Post));
