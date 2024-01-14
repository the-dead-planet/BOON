import ProjectForm from '../components/forms/Project';
import AppLayout from '../layouts/AppLayout';
import * as Types from '../logic/types';
import { useServices } from '../services';

interface Props {
    user: Types.User;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    mode: Types.Mode;
    onModeChange: (mode: Types.Mode) => void;
    push: (path: string) => void;
    notificationsProps: Types.NotificationProps;
    showError: (err: Error) => void;
}

export const AddProject = ({ user, mode, themeType, onThemeTypeChange, onModeChange, push, notificationsProps, showError }: Props) => {
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
                        .add(data as unknown as Types.ProjectSubmit)
                        .then(() => {
                            push('/sprints');
                        })
                        .catch(showError);
                }}
            />
        </AppLayout>
    );
};
