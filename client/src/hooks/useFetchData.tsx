import React from 'react';
import * as rxjs from 'rxjs';
import { useServices } from '../services';
import * as AppState from '../app-state';

const done$ = new rxjs.BehaviorSubject(false);

/**
 * Fetch data and save it to state on the first render.
 * To match previous behaviour, the wrapped component is rendered right away, regardless of fetch state.
 * This component will become redundant after introducing graphql.
 */
export const useFetchData = () => {
    const { sprintsService, projectsService, usersService } = useServices()!;

    React.useEffect(() => {
        if (done$.value) {
            return;
        }
        const abortController = new AbortController();

        // Fetch data from the backend and write to app state.
        // NOTE: temporary. Will be made obsolete by graphql.
        Promise.all([sprintsService.getAll(abortController.signal), projectsService.getAll(abortController.signal), usersService.getAll(abortController.signal)])
            .then((response) => {
                const [sprints, projects, users] = response;
                AppState.setStateData(sprints, projects, users);
                done$.next(true);
            })
            .catch((err: Error) => {
                AppState.notificationHandler.addNotification(err.message ?? 'Could not fetch data.')
            });

        return () => {
            abortController.abort();
        };
    }, [projectsService, sprintsService, usersService]);
};
