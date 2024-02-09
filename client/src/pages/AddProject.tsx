import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/forms/Project';
import AppLayout from '../layouts/AppLayout';
import { useServices } from '../services';
import * as Routes from '../routes';
import * as Types from '../logic/types';
import * as AppState from '../app-state';

let submitAbortController = new AbortController();

export const AddProject: React.FC = () => {
    const { projectsService } = useServices()!;
    const navigate = useNavigate();

    const handleSubmit = React.useCallback(
        (data: { [key in string]: unknown; }) => {
            submitAbortController.abort();
            submitAbortController = new AbortController();

            projectsService
                .add(data as unknown as Types.ProjectSubmit, submitAbortController.signal)
                .then(() => {
                    navigate(Routes.Types.RouterPaths.Sprints);
                })
                .catch((err) => {
                    AppState.notificationHandler.addNotification(err.message ?? 'Could not submit new project');
                });
        },
        [projectsService]
    );

    return (
        <AppLayout>
            <ProjectForm
                title="Add new project"
                initialValues={{
                    title: '',
                    content: '',
                }}
                onSubmit={handleSubmit}
            />
        </AppLayout>
    );
};
