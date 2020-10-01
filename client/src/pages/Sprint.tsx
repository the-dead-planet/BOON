import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import sprintsService from '../services/sprintsService';
import AppLayout from '../layouts/AppLayout';
import SprintView from '../components/sprint/SprintView';
import NavBarLeft from '../components/navigation/NavBarLeft';
import withShowError, { WithShowErrorInjectedProps } from '../utils/withShowError';
import { User, NotificationProps, Mode, StateData } from '../logic/types';
import moment from 'moment';
import { MONTH_YEAR_FORMAT } from '../utils/constants';

// TODO: see a comment in `Logout` regarding HOCs.
interface SprintProps {
    user: User | undefined | null;
    mode: Mode;
    setMode: any;
    data: StateData;
    setState: any;
    addPostComment: any;
    addSprintComment: any;
    removeObject: any;
    notificationsProps: NotificationProps;
    showError: any;
}

// If path is /sprints, redirect to the newest sprint
const Sprint = ({
    user,
    mode,
    setMode,
    data,
    setState,
    addPostComment,
    addSprintComment,
    removeObject,
    notificationsProps,
    showError,
}: SprintProps & WithShowErrorInjectedProps) => {
    const { id }: { id: string } = useParams();
    const { sprints: sprints, posts: posts, comments: comments, likes: likes, users: users, projects: projects } = data;

    let sprintToDisplayId = id;
    // If no specific `Sprint` has been specified, try to redirect to the
    // detail page of the most recent sprint.
    if (sprintToDisplayId === undefined) {
        // Wait for the sprints to load.
        // TODO: consider adding a HOC waiting for pending requests and rendering a spinner.

        if (sprints && sprints.size > 0) {
            // If no sprints exists, there's nowhere to redirect to.
            // TODO: consider handling this case by rendering a message.
            const mostRecentSprint = [...sprints.values()].reduce((
                a,
                b // TODO: check this typescript error
            ) => (new Date(a.dateTo) > new Date(b.dateTo) ? a : b));
            sprintToDisplayId = mostRecentSprint._id;
        }
    }

    const getSprints = async () => {
        let res = await sprintsService.getAll().catch(showError);
        await setState(res);
    };

    // Fetch sprints on the first render.
    // It will send a request when the user re-enters the sprints list page from some other page (e.g. form).
    // This way, the user has a way of refreshing sprints data.
    useEffect(() => {
        getSprints();
    }, []); // TODO: Investigate warning 'React Hook useEffect has a missing dependency: 'getSprints''

    // Get current sprint
    const sprint = sprints.get(id);

    const navPosts = sprint?.posts
        .map((id) => posts.get(id))
        .map((post) => ({ hash: true, id: post?._id || '', name: post?.title || '', path: `#${post?._id}` || '#' }));

    const navAdd = [
        { id: 'new-sprint', name: 'New sprint', path: '/add_sprint' },
        { id: 'new-project', name: 'New project', path: '/add_project' },
        { id: 'new-post', name: 'New post', path: '/add_post' },
    ];

    const navPlaceholder = [{ id: '', name: 'Printing...', path: '/' }];

    return sprintToDisplayId && sprintToDisplayId !== id ? (
        <Redirect to={`/sprints/${sprintToDisplayId}`} />
    ) : (
        <AppLayout
            user={user}
            mode={mode}
            setMode={setMode}
            appBar={true}
            pagination={{
                primary: `Sprint ${sprint?.number || ''}`,
                secondary: moment(sprint?.dateTo).format(MONTH_YEAR_FORMAT),
            }}
            navLeftContent={[
                { header: 'Highlights', list: navPosts || navPlaceholder },
                // TODO: Get a list of projects related to the posts related to currently displayed sprint
                { header: 'Related projects', list: navPosts || navPlaceholder },
                { header: 'Add stuff', list: navAdd || navPlaceholder },
            ]}
            sideColumn={{ header: '_goss', body: '' }}
            {...notificationsProps}
        >
            {/* Render the layout even if no sprint can be shown. The user would see a blank screen otherwise. */}
            {sprintToDisplayId && (
                <SprintView
                    user={user}
                    sprints={sprints}
                    posts={posts}
                    projects={projects}
                    comments={comments}
                    likes={likes}
                    users={users}
                    sprintId={id}
                    addPostComment={addPostComment}
                    addSprintComment={addSprintComment}
                    removeObject={removeObject}
                    onError={showError}
                    showError={showError}
                />
            )}
        </AppLayout>
    );
};

// export default (withShowError as any)(Sprint);
export default authenticatedPage(withPush(Sprint));
