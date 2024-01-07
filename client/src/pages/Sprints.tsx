import React, { useState, useEffect } from 'react';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import { useServices } from '../services';
import AppLayout from '../layouts/AppLayout';
import RedirectToFirst from '../components/RedirectToFirst';
import { User, NotificationPropsType, Mode } from '../logic/types';

type SprintsPageProps = {
    user: User | null;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
    notificationsProps: NotificationProps;
};

/**
 * Sprints list.
 * Redirect to the details page of the newest sprint.
 */
const SprintsPage = ({ notificationsProps, ...props }: SprintsPageProps) => {
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

export default authenticatedPage(withPush(SprintsPage));
