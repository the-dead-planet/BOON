import React from 'react';
import { Formik, Form, Field } from 'formik';
// import moment from 'moment';
import projectsService from '../services/projectsService';
import ProjectForm from '../components/forms/ProjectForm';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
// import { FORMIK_DATE_FORMAT } from '../utils/constants';
import NavBar from '../components/NavBar';
import '../styles/main.css';

const AddProject = ({ user, push }) => (
    <React.Fragment>
        <NavBar user={user} />
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
    </React.Fragment>
);

export default authenticatedPage(withPush(AddProject));
