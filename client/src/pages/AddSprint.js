import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import sprintsService from '../services/sprintsService';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import NavBar from '../components/NavBar';
import '../styles/main.css';

const AddSprint = ({ user, push }) => (
    <div>
        <NavBar user={user} />
        <h1 className="center">Add Sprint</h1>
        <Formik
            initialValues={{ dateFrom: '2010-10-10', dateTo: '2010-10-12' }}
            onSubmit={data => {
                sprintsService.add(data).then(() => {
                    push('/sprints');
                });
            }}
        >
            {() => (
                <Form>
                    <div className="center">
                        <p>
                            Number
                            <Field type="number" name="number" />
                        </p>
                        <p>
                            Name
                            <Field type="text" name="title" />
                        </p>
                        <p>
                            Date From
                            <Field type="date" name="dateFrom" />
                        </p>
                        <p>
                            Date To
                            <Field type="date" name="dateTo" />
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
    </div>
);

export default authenticatedPage(withPush(AddSprint));
