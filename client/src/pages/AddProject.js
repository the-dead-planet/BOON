import React from 'react';
import projectsService from '../services/projectsService';
import ProjectForm from '../components/forms/Project';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import AppLayout from '../layouts/AppLayout';
import withShowError from '../components/withShowError';

const AddProject = ({ user, push, notificationsProps, showError }) => {
    return (
        <AppLayout user={user} {...notificationsProps}>
            <ProjectForm
                title="Add new project"
                initialValues={{
                    title: '',
                    body: '',
                }}
                onSubmit={data => {
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
