import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authenticatedPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
import ProjectForm from '../components/forms/Project';
import { Loading } from '../components/Loading';
import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, ThemeType, ProjectSubmit, Project } from '../logic/types';
import { useServices } from '../services';

interface Props {
    user: User;
    themeType: ThemeType;
    onThemeTypeChange: (themeType: ThemeType) => void;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
    push: (path: string) => void;
    notificationsProps: NotificationProps;
    showError: (err: Error) => void;
}

const EditProject = ({ user, themeType, onThemeTypeChange, mode, onModeChange, push, notificationsProps, showError }: Props) => {
    const { id } = useParams<{ id: string; }>();

    const [project, setProject] = useState<Project | null>(null);

    const { projectsService } = useServices()!;

    const getProject = async () => {
        const project = await projectsService.getOne({ objectId: id ?? '' });
        setProject(project);
    };

    useEffect(() => {
        if (!project) {
            getProject();
        }
    });

    const projectTitle = project ? project.title : null;

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            onThemeTypeChange={onThemeTypeChange}
            mode={mode}
            onModeChange={onModeChange}
            {...notificationsProps}
        >
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
                    onSubmit={(data) => {
                        projectsService
                            .update({ ...(data as unknown as ProjectSubmit), objectId: id ?? '' })
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

export default authenticatedPage(withShowError(EditProject));
