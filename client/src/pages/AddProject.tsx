import React from 'react';
import projectsService from '../services/projectsService';
import ProjectForm from '../components/forms/Project';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import AppLayout from '../layouts/AppLayout';
import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, ThemeType, ProjectSubmit } from '../logic/types';

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

const AddProject = ({ user, themeType, setThemeType, mode, setMode, push, notificationsProps, showError }: Props) => {
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
