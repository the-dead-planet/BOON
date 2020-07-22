import React from 'react';
import projectsService from '../services/projectsService';
import ProjectForm from '../components/forms/Project';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import AppLayout from '../layouts/AppLayout';
import withShowError from '../components/withShowError';
import { User, NotificationProps, Mode, ProjectSubmit } from '../logic/types';

interface Props {
    user: User;
    mode: Mode;
    setMode: any;
    push: any;
    notificationsProps: NotificationProps;
    showError: any
}


const AddProject = ({ user, mode, setMode, push, notificationsProps, showError }: Props) => {
    return (
        <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
            <ProjectForm
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
