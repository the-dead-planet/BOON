import React from 'react';
import { useServices } from '../services';
import AppLayout from '../layouts/AppLayout';
import RedirectToFirst from '../components/RedirectToFirst';
import * as AppState from '../app-state';

/**
 * Projects list.
 * Redirect to the details page of the newest project.
 */
export const Projects: React.FC = () => {
    const { projectsService } = useServices()!;
    const [sortedProjectIds, setSortedProjectIds] = React.useState<Array<string> | null>(null);

    React.useEffect(() => {
        const abortController = new AbortController();

        projectsService
            .getAll(abortController.signal)
            .then((fetched) => {
                const sortedIds = fetched
                    .sort((a, b) => new Date(b.created).valueOf() - new Date(a.created).valueOf())
                    .map(({ _id }) => _id);
                setSortedProjectIds(sortedIds);
            })
            .catch((err) => {
                AppState.notificationHandler.addNotification(err.message ?? 'Could not get projects');
            });

        return () => {
            abortController.abort();
        };
    }, [projectsService]);

    return (
        <AppLayout>
            <RedirectToFirst items={sortedProjectIds} modelPath={'projects'} />
        </AppLayout>
    );
};
