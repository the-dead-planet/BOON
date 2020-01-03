import React from 'react';
import { Formik, Form, Field } from 'formik';
import sprintsService from '../services/sprintsService';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import NavBar from '../components/NavBar';
import './styles.css';

const AddSprint = ({ push, user }) => (
    <div>
        <NavBar user={user} />
        <h1 className="center">Add Sprint</h1>
        <Formik
            initialValues={{}}
            onSubmit={data =>
                sprintsService.add(data).then(() => {
                    push('/sprints');
                })
            }
        >
            {() => (
                <Form >
                    <div className="center">
                        <p>Number <Field type="number" name="number" /></p>
                        <p>Name <Field type="text" name="name" /></p>
                        <p>Date From<Field type="date" name="dateFrom" /></p>
                        <p>Date From<Field type="date" name="dateTo" /></p>
                        <p>Description <Field type="text" name="description" /></p>
                        <p><button type="submit">Submit</button></p>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
);

export default authenticatedPage(withPush(AddSprint));
