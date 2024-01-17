import React from 'react';
import { useServices } from '../services';
import AppLayout from '../layouts/AppLayout';
import RedirectToFirst from '../components/RedirectToFirst';


/**
 * Sprints list.
 * Redirect to the details page of the newest sprint.
 */
export const Sprints: React.FC = () => {
    const { sprintsService } = useServices()!;
    const [sortedSprintIds, setSortedSprintIds] = React.useState<Array<string> | null>(null);

    React.useEffect(() => {
        sprintsService.getAll().then((fetched) => {
            const sortedIds = fetched
                .sort((a, b) => {
                    const aTo = new Date(a.dateTo);
                    const bTo = new Date(b.dateTo);
                    return bTo.getTime() - aTo.getTime();
                })
                .map(({ _id }) => _id);
            setSortedSprintIds(sortedIds);
        });
    }, [setSortedSprintIds, sprintsService]);

    return (
        <AppLayout>
            <RedirectToFirst items={sortedSprintIds} modelPath={'sprints'} />
        </AppLayout>
    );
};
