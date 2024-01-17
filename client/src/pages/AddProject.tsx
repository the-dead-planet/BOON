import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/forms/Project';
import AppLayout from '../layouts/AppLayout';
import * as Types from '../logic/types';
import { useServices } from '../services';
import * as AppState from '../app-state';

export const AddProject: React.FC = () => {
    const { projectsService } = useServices()!;
    const navigate = useNavigate();

    return (
        <AppLayout>
            <ProjectForm
                title="Add new project"
                initialValues={{
                    title: '',
                    body: '',
                }}
                onSubmit={(data) => {
                    projectsService
                        .add(data as unknown as Types.ProjectSubmit)
                        .then(() => {
                            navigate('/sprints');
                        })
                        .catch((err) => {
                            AppState.notificationHandler.addNotification(err.message ?? 'Could not submit new project');
                        });
                }}
            />
        </AppLayout>
    );
};
