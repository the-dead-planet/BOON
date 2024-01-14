import ProjectForm from '../components/forms/Project';
// import { authenticatedPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
// import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, ProjectSubmit, ThemeType } from '../logic/types';
import { useServices } from '../services';

interface Props {
    user: User;
    themeType: ThemeType;
    onThemeTypeChange: (themeType: ThemeType) => void;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
    push: (path: string) => void;
    notificationsProps: NotificationProps;
    showError: (err: Error) => void;
}

const AddProject = ({ user, mode, themeType, onThemeTypeChange, onModeChange, push, notificationsProps, showError }: Props) => {
    const { projectsService } = useServices()!;
    return (
        <AppLayout
            user={user}
            themeType={themeType}
            onThemeTypeChange={onThemeTypeChange}
            mode={mode}
            onModeChange={onModeChange}
            {...notificationsProps}
        >
            <ProjectForm
                mode={mode}
                title="Add new project"
                initialValues={{
                    title: '',
                    body: '',
                }}
                onSubmit={(data) => {
                    projectsService
                        .add(data as unknown as ProjectSubmit)
                        .then(() => {
                            push('/sprints');
                        })
                        .catch(showError);
                }}
            />
        </AppLayout>
    );
};

export default AddProject;
// export default authenticatedPage(withShowError(AddProject));
