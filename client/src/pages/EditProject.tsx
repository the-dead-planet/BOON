import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import ProjectForm from '../components/forms/Project';
import { Loading } from '../components/Loading';
import { useServices } from '../services';
import * as Types from '../logic/types';
import * as AppState from '../app-state';

let submitAbortController = new AbortController();

export const EditProject: React.FC = () => {
    const params = useParams<{ id: string; }>();
    const [project, setProject] = React.useState<Types.Project | null>(null);
    const { projectsService } = useServices()!;
    const navigate = useNavigate();

    React.useEffect(() => {
        if (project && project._id === params.id) {
            return;
        }
        const abortController = new AbortController();

        projectsService
            .getOne({ objectId: params.id ?? '' }, abortController.signal)
            .then((p) => {
                if (p) {
                    setProject(p);
                } else {
                    AppState.notificationHandler.addNotification(`Project ${params.id} does not exist`);
                }
            })
            .catch((err) => {
                AppState.notificationHandler.addNotification(err.message ?? `Error getting project ${params.id}`);
            });

        return () => {
            abortController.abort();
        };
    }, [params.id]);

    const projectTitle = React.useMemo(() => project ? project.title : null, [project?.title]);

    const handleSubmit = React.useCallback(
        (data: { [key in string]: unknown; }) => {
            submitAbortController.abort();
            submitAbortController = new AbortController();

            projectsService
                .update({ ...(data as unknown as Types.ProjectSubmit), objectId: params.id ?? '' }, submitAbortController.signal)
                .then(() => {
                    navigate('/projects');
                })
                .catch((err) => {
                    AppState.notificationHandler.addNotification(err.message ?? `Error editing project ${params.id}`);
                });
        },
        [projectsService, params.id]
    );

    return (
        <AppLayout>
            <h1 className="center">Edit Project {params.id}</h1>
            {!project ? (
                <Loading />
            ) : (
                <ProjectForm
                    title={`Edit project: ${projectTitle}`}
                    // TODO: Solve the possibly 'null' error.
                    // Assure that sprint is either of type Sprint or undefined and use sprint?.number (optional chaining ES2020)
                    initialValues={{
                        title: project.title,
                        content: project.content,
                    }}
                    onSubmit={handleSubmit}
                />
            )}
        </AppLayout>
    );
};
