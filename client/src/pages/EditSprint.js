import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import moment from 'moment';
import sprintsService from '../services/sprintsService';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import { FORMIK_DATE_FORMAT } from '../utils/constants';
import NavBar from '../components/NavBar';
import '../styles/main.css';

const EditSprint = ({ user, push }) => (
    <div>
        <NavBar user={this.user} />
        <h1 className="center">Add Sprint</h1>
        <Formik
            initialValues={{
                dateFrom: moment().format(FORMIK_DATE_FORMAT),
                dateTo: moment().format(FORMIK_DATE_FORMAT),
            }}
            onSubmit={data => {
                sprintsService.add(data).then(() => {
                    this.props.push('/sprints');
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

export default authenticatedPage(withPush(EditSprint));
