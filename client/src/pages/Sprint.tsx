import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import { useServices } from '../services';
import AppLayout from '../layouts/AppLayout';
import { CommentsSection } from '../components/CommentsSection';
import { SingleSprint } from '../components/sprint/SingleSprint';
import {
    // withShowError,
    WithShowErrorInjectedProps,
} from '../utils/withShowError';
import { User, NotificationProps, ThemeType, Mode, StateData, Sprint as SprintType, Model } from '../logic/types';
import moment from 'moment';
import { MONTH_YEAR_FORMAT } from '../constants/dateFormats';
import { PATHS, QUOTES } from '../constants/data';
const { sprints } = PATHS;
const sprintsPath = sprints;

// TODO: see a comment in `Logout` regarding HOCs.
interface SprintProps {
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
}

const Sprint = ({
    user,
    themeType,
    setThemeType,
    mode,
    setMode,
    data,
    setStateData,
    addPostComment,
    addSprintComment,
    removeObject,
    notificationsProps,
    showError,
}: SprintProps & WithShowErrorInjectedProps) => {
    const { id }: { id: string } = useParams();
    const { sprints: sprints, posts: posts, comments: comments, likes: likes, users: users, projects: projects } = data;
    const [quote, setQuote] = useState('');
    const { sprintsService, projectsService, usersService } = useServices()!;

    /* 
        GET DATA FROM DATA BASE AND WRITE TO APP STATE
    */
    const getData = async () => {
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
        GET CURRENT SPRINT ID DATA FROM APP STATE
    */
    const sprint = sprints.get(id);

    /*
        SORT SPRINTS FOR PAGINATION
    */
    const sortedSprints = sprints ? [...sprints.values()].sort((a, b) => b.number - a.number) : [];
    let currentInd = 0;
    sortedSprints.forEach((spr, i) => {
        if (spr._id === id) {
            currentInd = i;
        }
    });

    /* 
        NAVIGATION ITEMS
    */
    const sprintPosts = sprint?.posts;
    const navPosts = sprintPosts
        ?.map((postId) => posts.get(postId))
        .map((post) => ({ hash: true, id: post?._id || '', name: post?.title || '', path: `#${post?._id}` || '#' }));

    const navProjects = [
        ...new Set(
            sprintPosts
                ?.map((postId) =>
                    [...projects.values()].reduce((acc, project) => (project.posts.includes(postId) ? project : acc))
                )
                .map((project) => project._id)
        ),
    ].map((projectId) => ({
        id: projectId || '',
        name: projects.get(projectId)?.title || '',
        path: `/projects/${projectId}`,
    }));

    const navPlaceholder = [{ id: '', name: 'Printing...', path: '/' }];

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
        console.log('TSD', open, title, parentModel, parentId);
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

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            setThemeType={setThemeType}
            mode={mode}
            setMode={setMode}
            appBar={true}
            quote={quote}
            pagination={{
                path: sprintsPath,
                currentId: id,
                nextId: currentInd > 0 ? sortedSprints[currentInd - 1]._id : undefined,
                previousId: currentInd < sortedSprints.length - 1 ? sortedSprints[currentInd + 1]._id : undefined,
                primary: `Sprint ${sprint?.number || ''}`,
                secondary: moment(sprint?.dateTo).format(MONTH_YEAR_FORMAT),
                list: sprints
                    ? [...sprints.values()].map((spr: SprintType) => ({
                          name: spr?.title,
                          path: sprintsPath,
                          id: spr._id,
                          number: spr.number,
                      }))
                    : undefined,
            }}
            createButton={{ name: 'Create', onClick: () => '' }}
            navPanel={{
                side: 'left',
                content: [
                    { header: 'Highlights', list: navPosts || navPlaceholder },
                    // TODO: Get a list of projects related to the posts related to currently displayed sprint
                    { header: 'Related projects', list: navProjects || navPlaceholder },
                ],
            }}
            sideColumn={{
                header: '_goss',
                body:
                    'We heard that our favorite developer, Geek124, switched to GraphQL. Unbelievable. Can you believe it?',
            }}
            secondaryDrawer="a" // TODO: fill with comments from related object
            secondaryDrawerOpen={openSecondaryDrawer}
            secondaryDrawerContent={sprint ? commentsSection : undefined}
            toggleSecondaryDrawer={toggleSecondaryDrawer}
            {...notificationsProps}
        >
            <SingleSprint
                user={user}
                themeType={themeType}
                sprint={sprint}
                posts={posts}
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
        </AppLayout>
    );
};

// export default (withShowError as any)(Sprint);
export default authenticatedPage(withPush(Sprint));
