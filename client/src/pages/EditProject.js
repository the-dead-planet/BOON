import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
// import moment from 'moment';
import projectsService from '../services/projectsService';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
// import { FORMIK_DATE_FORMAT } from '../utils/constants';
import AppLayout from '../layouts/AppLayout';
import Loading from '../components/Loading';
import withShowError from '../components/withShowError';

const EditProject = ({ user, push, notificationProps, showError }) => {
    const { id } = useParams();

    const [project, setProject] = useState(null);

    const getProject = async () => {
        const project = await projectsService.getOne({ objectId: id });
        setProject(project);
    };

    useEffect(() => {
        if (!project) {
            getProject();
        }
    });

    return (
        <AppLayout user={user} {...notificationsProps}>
            <h1 className="center">Edit Project {id}</h1>
            {!project ? (
                <Loading />
            ) : (
                <ProjectForm
                    title={`Edit project: ${project.title}`}
                    initialValues={{
                        title: project.title,
                        body: project.body,
                    }}
                    onSubmit={data => {
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
