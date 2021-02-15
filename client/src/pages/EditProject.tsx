import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import AppLayout from '../layouts/AppLayout';
import ProjectForm from '../components/forms/Project';
import { Loading } from '../components/Loading';
import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, ProjectSubmit, Project } from '../logic/types';
import { useServices } from '../services';

interface Props {
    user: User;
    mode: Mode;
    setMode: any;
    push: any;
    notificationsProps: NotificationProps;
    showError: any;
}

interface Params {
    id: string;
}

const EditProject = ({ user, mode, setMode, push, notificationsProps, showError }: Props) => {
    const { id } = useParams<Params>();

    const [project, setProject] = useState<Project | null>(null);

    const { projectsService } = useServices()!;

    const getProject = async () => {
        const project = await projectsService.getOne({ objectId: id });
        setProject(project);
    };

    useEffect(() => {
        if (!project) {
            getProject();
        }
    });

    const projectTitle = project ? project.title : null;

    return (
        <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
            <h1 className="center">Edit Project {id}</h1>
            {!project ? (
                <Loading />
            ) : (
                <ProjectForm
                    mode={mode}
                    title={`Edit project: ${projectTitle}`}
                    // TODO: Solve the possibly 'null' error.
                    // Assure that sprint is either of type Sprint or undefined and use sprint?.number (optional chaining ES2020)
                    initialValues={{
                        title: project.title,
                        body: project.body,
                    }}
                    onSubmit={(data: ProjectSubmit) => {
                        projectsService
                            .update({ ...data, objectId: id })
                            .then(() => {
                                push('/projects');
                            })
                            .catch(showError);
                    }}
                />
            )}
        </AppLayout>
    );
};

export default authenticatedPage(withPush(withShowError(EditProject)));
