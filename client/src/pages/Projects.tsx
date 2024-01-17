import React from 'react';
import { useServices } from '../services';
import AppLayout from '../layouts/AppLayout';
import RedirectToFirst from '../components/RedirectToFirst';

/**
 * Projects list.
 * Redirect to the details page of the newest project.
 */
export const Projects: React.FC = () => {
    const { projectsService } = useServices()!;
    const [sortedProjectIds, setSortedProjectIds] = React.useState<Array<string> | null>(null);

    // Fetch sprints.
    React.useEffect(() => {
        projectsService.getAll().then((fetched) => {
            const sortedIds = fetched
                .sort((a, b) => {
                    const aKey = new Date(a.created);
                    const bKey = new Date(b.created);
                    return bKey.getTime() - aKey.getTime();
                })
                .map(({ _id }) => _id);
            setSortedProjectIds(sortedIds);
        });
    }, [setSortedProjectIds, projectsService]);

    return (
        <AppLayout>
            <RedirectToFirst items={sortedProjectIds} modelPath={'projects'} />
        </AppLayout>
    );
};
