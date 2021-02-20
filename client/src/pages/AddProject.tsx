import React from 'react';
import ProjectForm from '../components/forms/Project';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import AppLayout from '../layouts/AppLayout';
import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, ProjectSubmit, ThemeType } from '../logic/types';
import { useServices } from '../services';

interface Props {
    user: User;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
    push: any;
    notificationsProps: NotificationProps;
    showError: any;
}

const AddProject = ({ user, mode, themeType, setThemeType, setMode, push, notificationsProps, showError }: Props) => {
    const { projectsService } = useServices()!;
    return (
        <AppLayout
            user={user}
            themeType={themeType}
            setThemeType={setThemeType}
            mode={mode}
            setMode={setMode}
            {...notificationsProps}
        >
            <ProjectForm
                mode={mode}
                title="Add new project"
                initialValues={{
                    title: '',
                    body: '',
                }}
                onSubmit={(data: ProjectSubmit) => {
                    projectsService
                        .add(data)
                        .then(() => {
                            push('/sprints');
                        })
                        .catch(showError);
                }}
            />
        </AppLayout>
    );
};

export default authenticatedPage(withPush(withShowError(AddProject)));
