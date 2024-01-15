import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import ProjectForm from '../components/forms/Project';
import { Loading } from '../components/Loading';
import { useServices } from '../services';
import * as Types from '../logic/types';

interface Props {
    user: Types.User;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    mode: Types.Mode;
    onModeChange: (mode: Types.Mode) => void;
    push: (path: string) => void;
    notificationsProps: Types.NotificationProps;
    showError: (err: Error) => void;
}

export const EditProject = ({ user, themeType, onThemeTypeChange, mode, onModeChange, push, notificationsProps, showError }: Props) => {
    const params = useParams<{ id: string; }>();
    const [project, setProject] = useState<Types.Project | null>(null);
    const { projectsService } = useServices()!;

    useEffect(() => {
        if (project && project._id === params.id) {
            return;
        }

        projectsService.getOne({ objectId: params.id ?? '' })
            .then((p) => {
                if (p) {
                    setProject(p);
                } else {
                    // TODO:
                }
            })
            .catch(showError);
    }, [params.id]);

    const projectTitle = useMemo(() => project ? project.title : null, [project?.title]);

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            onThemeTypeChange={onThemeTypeChange}
            mode={mode}
            onModeChange={onModeChange}
            {...notificationsProps}
        >
            <h1 className="center">Edit Project {params.id}</h1>
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
                            .update({ ...(data as unknown as Types.ProjectSubmit), objectId: params.id ?? '' })
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
