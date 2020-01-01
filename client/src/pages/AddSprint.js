import React from 'react';
import { Formik, Form, Field } from 'formik';
import sprintsService from '../services/sprintsService';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';

const AddSprint = ({ push }) => (
    <div>
        <Formik
            initialValues={{}}
            onSubmit={data =>
                sprintsService.add(data).then(() => {
                    push('/sprints');
                })
            }
        >
            {() => (
                <Form>
                    <Field type="number" name="number" />
                    <Field type="text" name="name" />
                    <Field type="date" name="dateFrom" />
                    <Field type="text" name="description" />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default authenticatedPage(withPush(AddSprint));
