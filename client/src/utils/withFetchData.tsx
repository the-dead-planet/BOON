import { useEffect, useState } from 'react';
import { useServices } from '../services';

type WithDataFetchProps = {
    showError: any;
    setStateData: any;
};

/**
 * Fetch data and save it to state on the first render.
 *
 * To match previous behaviour, the wrapped component is rendered right away, regardless of fetch state.
 * This component will become redundant after introducing graphql.
 */
export const withFetchData = <T extends WithDataFetchProps>(wrappedComponent: any) => (props: T) => {
    const { showError, setStateData } = props;
    const { sprintsService, projectsService, usersService } = useServices()!;
    const [requestSent, setRequestSent] = useState(false);

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
            .catch(showError)
            .then(([sprints, projects, users]) => {
                setStateData(sprints, projects, users);
            });
    }, [requestSent, setRequestSent, projectsService, sprintsService, usersService, showError, setStateData]);

    return wrappedComponent(props);
};
