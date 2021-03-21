import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import AppLayout from '../layouts/AppLayout';
import { CommentsSection } from '../components/CommentsSection';
import { SingleProject } from '../components/project/SingleProject';
import {
    // withShowError,
    WithShowErrorInjectedProps,
} from '../utils/withShowError';
import { User, NotificationProps, Mode, ThemeType, StateData, Project, Model } from '../logic/types';
import { PATHS, QUOTES } from '../constants/data';
import { useServices } from '../services';
const { projects } = PATHS;
const projectsPath = projects;

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
    const { sprintsService, projectsService, usersService } = useServices()!;
    const { id }: { id: string } = useParams();
    const { sprints: sprints, posts: posts, comments: comments, likes: likes, users: users, projects: projects } = data;
    const [quote, setQuote] = useState('');

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
    const project = projects.get(id)!;

    /*
        SORT SPRINTS FOR PAGINATION
    */
    const sortedProjects = projects
        ? [...projects.values()].sort(
              (a, b) => new Date(b.created).getMilliseconds() - new Date(a.created).getMilliseconds()
          )
        : [];

    let currentInd = 0;
    sortedProjects.forEach((spr, i) => {
        if (spr._id === id) {
            currentInd = i;
        }
    });

    /* 
        NAVIGATION ITEMS
    */
    const projectPosts = project?.posts;

    const navPosts = projectPosts
        ?.map((postId) => posts.get(postId))
        .map((post) => ({ hash: true, id: post?._id || '', name: post?.title || '', path: `#${post?._id}` || '#' }));

    const navProjects = [...projects.values()]?.map((project: Project) => ({
        id: project._id || '',
        name: project.title || '',
        path: `/projects/${project._id}`,
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
            // title={project?.title}
            pagination={{
                path: projectsPath,
                // currentId: id,
                // nextId: currentInd > 0 ? sortedProjects[currentInd - 1]._id : undefined,
                // previousId: currentInd < sortedProjects.length - 1 ? sortedProjects[currentInd + 1]._id : undefined,
                // primary: project ? `Project: ${project?.title}` : '',
                // secondary: '',
                // list: projects
                //     ? [...projects.values()].map((proj: Project) => ({
                //           name: proj?.title,
                //           path: projectsPath,
                //           id: proj._id,
                //           number: 0,
                //       }))
                //     : undefined,
            }}
            navPanel={{
                side: 'left',
                content: [{ header: 'All projects', activeId: project?._id, list: navProjects || navPlaceholder }],
                variant: 'secondary',
            }}
            sideColumn={{
                header: '_news',
                body: `We found something on the internet which is related to ${project?.title}. \"THEY\" say that...`,
            }}
            secondaryDrawer="a" // TODO: fill with comments from related object
            secondaryDrawerOpen={openSecondaryDrawer}
            secondaryDrawerContent={project ? commentsSection : undefined}
            toggleSecondaryDrawer={toggleSecondaryDrawer}
            {...notificationsProps}
        >
            <SingleProject
                user={user}
                themeType={themeType}
                project={project}
                sprints={sprints}
                posts={posts}
                projects={projects}
                comments={comments}
                likes={likes}
                users={users}
                addPostComment={addPostComment}
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
