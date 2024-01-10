import { useState, useEffect } from 'react';
// import { authenticatedPage } from '../utils/authenticatedPage';
import { useServices } from '../services';
import AppLayout from '../layouts/AppLayout';
import RedirectToFirst from '../components/RedirectToFirst';
import { User, NotificationProps, ThemeType, Mode } from '../logic/types';

type SprintsPageProps = {
    user: User | null;
    themeType: ThemeType;
    onThemeTypeChange: (themeType: ThemeType) => void;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
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

// const AuthenticatedSprintsPage = authenticatedPage(SprintsPage);

// export default AuthenticatedSprintsPage;
export default SprintsPage;
