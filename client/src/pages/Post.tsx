import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '../utils/useQuery';
import { withFetchData } from '../utils/withFetchData';
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
import { getRandomQuote } from '../utils/data';

// TODO: see a comment in `Logout` regarding HOCs.
interface Props {
    user: User | undefined | null;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
    data: StateData;
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

    const { sprints, posts, comments, likes, users, projects } = data;

    const [quote, setQuote] = useState('');
    useEffect(() => {
        setQuote(getRandomQuote());
    }, [setQuote]);

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
export default authenticatedPage(withPush(withFetchData(Post)));
