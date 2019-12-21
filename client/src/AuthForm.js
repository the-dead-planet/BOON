import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

const AuthForm = ({ onSubmit }) => (
    <div>
        <Formik initialValues={{ user: '', password: '', email: '', team: '' }} onSubmit={onSubmit}>
            {() => (
                <Form>
                    <Field type="user" name="user" />
                    <Field type="password" name="password" />
                    <Field type="email" name="email" />
                    <Field type="team" name="team" />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default AuthForm;
