import React from 'react';
import { Formik, Form, Field } from 'formik';

const AuthForm = ({ onSubmit }) => (
    <div>
        <Formik initialValues={{ user: '', password: '', email: '' }} onSubmit={onSubmit}>
            {() => (
                <Form>
                    <Field type="user" name="user" />
                    <Field type="password" name="password" />
                    <Field type="email" name="email" />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default AuthForm;
