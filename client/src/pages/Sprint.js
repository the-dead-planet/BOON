import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import sprintsService from '../services/sprintsService';
import AppLayout from '../layouts/AppLayout';
import SprintView from '../components/sprint/SprintView';
import withShowError from '../components/withShowError';

// If path is /sprints, redirect to the newest sprint
const Sprint = ({ user, data, setState, notificationsProps, onError, showError }) => {
    const { id } = useParams();
    const { sprints, posts, comments, likes } = data;
    let sprintToDisplayId = id;
    // If no specific `Sprint` has been specified, try to redirect to the
    // detail page of the most recent sprint.
    if (sprintToDisplayId === undefined) {
        // Wait for the sprints to load.
        // TODO: consider adding a HOC waiting for pending requests and rendering a spinner.

        if (sprints) {
            // If no sprints exists, there's nowhere to redirect to.
            // TODO: consider handling this case by rendering a message.
            if ([...sprints.values()].length !== 0) {
                const mostRecentSprint = [...sprints.values()].reduce((a, b) =>
                    new Date(a.dateTo) > new Date(b.dateTo) ? a : b
                );
                sprintToDisplayId = mostRecentSprint._id;
            }
        }
    }

    const getSprints = async () => {
        let res = await sprintsService.getAll().catch(onError);
        await setState(res);
    };

    // Fetch sprints on the first render.
    // It will send a request when the user re-enters the sprints list page from some other page (e.g. form).
    // This way, the user has a way of refreshing sprints data.
    useEffect(() => {
        getSprints();
    }, []); // TODO: Investigate warning 'React Hook useEffect has a missing dependency: 'getSprints''

    return sprintToDisplayId && sprintToDisplayId !== id ? (
        <Redirect to={`/sprints/${sprintToDisplayId}`} />
    ) : (
        <AppLayout user={user} {...notificationsProps}>
            {/* Render the layout even if no sprint can be shown. The user would see a blank screen otherwise. */}
            {sprintToDisplayId && (
                <SprintView
                    user={user}
                    sprints={sprints}
                    posts={posts}
                    comments={comments}
                    likes={likes}
                    sprintId={id}
                    onError={onError}
                    showError={showError}
                />
            )}
        </AppLayout>
    );
};

export default withShowError(Sprint);
