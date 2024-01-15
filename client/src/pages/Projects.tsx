import { useState, useEffect } from 'react';
import { useServices } from '../services';
import AppLayout from '../layouts/AppLayout';
import RedirectToFirst from '../components/RedirectToFirst';
import * as Types from '../logic/types';

type Props = {
    user: Types.User | null;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    mode: Types.Mode;
    onModeChange: (mode: Types.Mode) => void;
    notificationsProps: Types.NotificationProps;
};

/**
 * Projects list.
 * Redirect to the details page of the newest project.
 */
export const Projects = ({ notificationsProps, ...props }: Props) => {
    const { projectsService } = useServices()!;
    const [sortedProjectIds, setSortedProjectIds] = useState<Array<string> | null>(null);

    // Fetch sprints.
    useEffect(() => {
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
        <AppLayout {...notificationsProps} {...props}>
            <RedirectToFirst items={sortedProjectIds} modelPath={'projects'} />
        </AppLayout>
    );
};
