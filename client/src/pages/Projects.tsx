import { useState, useEffect } from 'react';
// import { authenticatedPage } from '../utils/authenticatedPage';
import { useServices } from '../services';
import AppLayout from '../layouts/AppLayout';
import RedirectToFirst from '../components/RedirectToFirst';
import { User, NotificationProps, ThemeType, Mode } from '../logic/types';

type ProjectsPageProps = {
    user: User | null;
    themeType: ThemeType;
    onThemeTypeChange: (themeType: ThemeType) => void;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
    notificationsProps: NotificationProps;
};

/**
 * Projects list.
 * Redirect to the details page of the newest project.
 */
const ProjectsPage = ({ notificationsProps, ...props }: ProjectsPageProps) => {
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

// const AuthenticatedProjectsPage = authenticatedPage(ProjectsPage);

// export default AuthenticatedProjectsPage;
export default ProjectsPage;
