import React from 'react';
// import { Formik, Form, Field } from 'formik';
// import moment from 'moment';
import projectsService from '../services/projectsService';
import ProjectForm from '../components/forms/Project';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
// import { FORMIK_DATE_FORMAT } from '../utils/constants';
import AppLayout from '../layouts/AppLayout';
import '../styles/main.css';

const AddProject = ({ user, push, notificationsProps }) => (
    <AppLayout user={user} {...notificationsProps}>
        <ProjectForm
            title="Add new project"
            initialValues={{
                title: '',
                body: '',
            }}
            onSubmit={data => {
                projectsService.add(data).then(() => {
                    push('/sprints');
                });
            }}
        />
    </AppLayout>
);

export default authenticatedPage(withPush(AddProject));
