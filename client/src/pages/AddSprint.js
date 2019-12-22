import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import sprintsService from '../services/sprintsService';
import { withLoginRequired } from '../utils/authDecorators';

const AddSprint = () => (
    <div>
        <Formik initialValues={{}} onSubmit={data => sprintsService.add(data)}>
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

export default withLoginRequired(AddSprint);
