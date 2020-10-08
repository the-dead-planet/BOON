import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import sprintsService from '../services/sprintsService';
import AppLayout from '../layouts/AppLayout';
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
const Project = ({
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

    return (
        <AppLayout
            user={user}
            mode={mode}
            setMode={setMode}
            appBar={true}
            {...notificationsProps}
            pagination={{
                primary: `Project ${sprint?.number || ''}`,
                secondary: moment(sprint?.dateTo).format(MONTH_YEAR_FORMAT),
                currentId: id,
                nextId: id,
                previousId: id,
            }}
        >
            {/* TODO:  */}
        </AppLayout>
    );
};

// export default (withShowError as any)(Sprint);
export default authenticatedPage(withPush(Project));
