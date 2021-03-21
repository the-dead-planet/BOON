import React, { useEffect } from 'react';
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

    // Fetch data on the first render.
    useEffect(() => {
        // Fetch data from the backend and write to app state.
        // NOTE: temporary. Will be made obsolete by graphql.
        Promise.all([sprintsService.getAll(), projectsService.getAll(), usersService.getAll()])
            .catch(showError)
            .then(([sprints, projects, users]) => {
                setStateData(sprints, projects, users);
            });
    }, [projectsService, sprintsService, usersService, showError, setStateData]);

    return wrappedComponent(props);
};
