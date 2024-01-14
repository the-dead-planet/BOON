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
 * Sprints list.
 * Redirect to the details page of the newest sprint.
 */
export const Sprints = ({ notificationsProps, ...props }: Props) => {
    const { sprintsService } = useServices()!;
    const [sortedSprintIds, setSortedSprintIds] = useState<Array<string> | null>(null);

    // Fetch sprints.
    useEffect(() => {
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
        <AppLayout {...notificationsProps} {...props}>
            <RedirectToFirst items={sortedSprintIds} modelPath={'sprints'} />
        </AppLayout>
    );
};
