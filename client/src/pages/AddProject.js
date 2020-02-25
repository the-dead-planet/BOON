import React from 'react';
import { Formik, Form, Field } from 'formik';
// import moment from 'moment';
import projectsService from '../services/projectsService';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
// import { FORMIK_DATE_FORMAT } from '../utils/constants';
import NavBar from '../components/NavBar';
import '../styles/main.css';

const AddProject = ({ user, push }) => (
    <React.Fragment>
        <NavBar user={user} />
        <h1 className="center">Add Project</h1>
        <Formik
            initialValues={{}}
            onSubmit={data => {
                projectsService.add(data).then(() => {
                    push('/sprints');
                });
            }}
        >
            {() => (
                <Form>
                    <div className="center">
                        <p>
                            Name
                            <Field type="text" name="title" />
                        </p>
                        <p>
                            Description
                            <Field type="text" name="body" />
                        </p>
                        <p>
                            <button type="submit">Submit</button>
                        </p>
                    </div>
                </Form>
            )}
        </Formik>
    </React.Fragment>
);

export default authenticatedPage(withPush(AddProject));
