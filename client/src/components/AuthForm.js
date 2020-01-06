import React from 'react';
import { Formik, Form, Field } from 'formik';

function AuthForm({type, onSubmit}) {
    
    var usernameField, teamField = null;

    if (type === 'register') {
        usernameField = <p>Username <Field type="username" name="username" /></p>;
        teamField = <p>Team <Field type="text" name="team" /></p>;
    }

    return (
        <div>
            <Formik initialValues={{ username: '', password: '', email: '', team: '' }} onSubmit={onSubmit}>
                {() => (
                    <Form>
                        <p>E-mail <Field type="email" name="email" /></p>
                        {usernameField}
                        <p>Password <Field type="password" name="password" /></p>
                        {teamField}
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )

}

export default AuthForm;
