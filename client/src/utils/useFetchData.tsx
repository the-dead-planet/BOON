import { useEffect, useState } from 'react';
import { useServices } from '../services';
import { Project, Sprint, User } from '../logic/types';

/**
 * Fetch data and save it to state on the first render.
 *
 * To match previous behaviour, the wrapped component is rendered right away, regardless of fetch state.
 * This component will become redundant after introducing graphql.
 */
export const useFetchData = (showError?: (err: Error) => void) => {
    const { sprintsService, projectsService, usersService } = useServices()!;
    const [requestSent, setRequestSent] = useState(false);
    const [data, setData] = useState<[Sprint[], Project[], User[]] | null>(null);

    // Fetch data on the first render.
    useEffect(() => {
        // Do nothing if the request has already been sent.
        if (requestSent) {
            return;
        }

        setRequestSent(true);

        // Fetch data from the backend and write to app state.
        // NOTE: temporary. Will be made obsolete by graphql.
        Promise.all([sprintsService.getAll(), projectsService.getAll(), usersService.getAll()])
            .then((response) => {
                const [sprints, projects, users] = response;
                setData([sprints, projects, users]);
            })
            .catch((e) => showError?.(e));

    }, [requestSent, setRequestSent, projectsService, sprintsService, usersService, showError,]);

    return data;
};
