import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/forms/Project';
import AppLayout from '../layouts/AppLayout';
import { useServices } from '../services';
import * as Routes from '../routes';
import * as Types from '../logic/types';
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
                            navigate(Routes.Types.RouterPaths.Sprints);
                        })
                        .catch((err) => {
                            AppState.notificationHandler.addNotification(err.message ?? 'Could not submit new project');
                        });
                }}
            />
        </AppLayout>
    );
};
