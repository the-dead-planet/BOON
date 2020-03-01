import React from 'react';
import { Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AppForm from './AppForm';

const AuthForm = ({ register, initialValues, onSubmit }) => {

    return (
        <AppForm title={register ? 'Register' : 'Login'} initialValues={initialValues} onSubmit={onSubmit} >
            <Grid item xs={12}>
                <Field
                    required
                    as={TextField}
                    name="email"
                    id="auth-email"
                    label="E-mail"
                />

                {register ? (
                    <Grid item xs={12}>
                        <Field as={TextField} name="username" required id="auth-username" label="Username" />
                    </Grid>
                ) : (
                        null
                    )}

                <Grid item xs={12}>
                    <Field
                        type="password"
                        as={TextField}
                        name="password"
                        required
                        id="auth-password"
                        label="Password"
                    />
                </Grid>

                {register ? (
                    <Grid item xs={12}>
                        <Field as={TextField} name="team" required id="auth-team" label="Team" />
                    </Grid>
                ) : (
                        null
                    )}
            </Grid>

        </AppForm>
    );
};

export default AuthForm;
