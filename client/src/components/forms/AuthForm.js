import React from 'react';
import TextField from '@material-ui/core/TextField';
import AppForm from './AppForm';
import GridField from './GridField';

const AuthForm = ({ register, initialValues, onSubmit }) => {
    return (
        <AppForm title={register ? 'Register' : 'Login'} initialValues={initialValues} onSubmit={onSubmit}>
            <GridField required as={TextField} name="email" id="auth-email" label="E-mail" xs={12} />

            {register ? (
                <GridField required as={TextField} name="username" id="auth-username" label="Username" xs={12} />
            ) : null}

            <GridField
                required
                type="password"
                as={TextField}
                name="password"
                id="auth-password"
                label="Password"
                xs={12}
            />

            {register ? <GridField required as={TextField} name="team" id="auth-team" label="Team" /> : null}
        </AppForm>
    );
};

export default AuthForm;
