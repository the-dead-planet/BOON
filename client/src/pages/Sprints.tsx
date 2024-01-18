import React from 'react';
import { useServices } from '../services';
import AppLayout from '../layouts/AppLayout';
import RedirectToFirst from '../components/RedirectToFirst';
import * as AppState from '../app-state';

/**
 * Sprints list.
 * Redirect to the details page of the newest sprint.
 */
export const Sprints: React.FC = () => {
    const { sprintsService } = useServices()!;
    const [sortedSprintIds, setSortedSprintIds] = React.useState<Array<string> | null>(null);

    React.useEffect(() => {
        const abortController = new AbortController();

        sprintsService
            .getAll(abortController.signal)
            .then((fetched) => {
                const sortedIds = fetched
                    .sort((a, b) => new Date(b.dateTo).valueOf() - new Date(a.dateTo).valueOf())
                    .map(({ _id }) => _id);

                setSortedSprintIds(sortedIds);
            })
            .catch((err: Error) => {
                AppState.notificationHandler.addNotification(err.message ?? 'Coult not get all sprints.')
            });

        return () => {
            abortController.abort();
        };
    }, [sprintsService]);

    return (
        <AppLayout>
            <RedirectToFirst items={sortedSprintIds} modelPath={'sprints'} />
        </AppLayout>
    );
};
