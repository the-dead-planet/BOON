import React from 'react';
import services from '../services/realImpl';
import ProjectForm from '../components/forms/Project';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import AppLayout from '../layouts/AppLayout';
import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, ProjectSubmit } from '../logic/types';

interface Props {
    user: User;
    mode: Mode;
    setMode: any;
    push: any;
    notificationsProps: NotificationProps;
    showError: any;
}

const AddProject = ({ user, mode, setMode, push, notificationsProps, showError }: Props) => {
    return (
        <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
            <ProjectForm
                mode={mode}
                title="Add new project"
                initialValues={{
                    title: '',
                    body: '',
                }}
                onSubmit={(data: ProjectSubmit) => {
                    services.projectsService
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
