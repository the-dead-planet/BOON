import React from 'react';
import TextField from '@material-ui/core/TextField';
import { AppFormPaper } from './App';
import { GridField } from './GridFields';
import { Submit } from '../../logic/types';

interface Props {
    register: any;
    initialValues: Submit;
    onSubmit: any;
}

const AuthForm = ({ register, initialValues, onSubmit }: Props) => {
    return (
        <AppFormPaper title={register ? 'Register' : 'Login'} initialValues={initialValues} onSubmit={onSubmit}>
            <GridField required as={TextField} name="email" id="auth-email" label="E-mail" xs={12} />

            {register && <GridField required as={TextField} name="username" id="auth-username" label="Username" xs={12} />}

            <GridField
                required
                type="password"
                as={TextField}
                name="password"
                id="auth-password"
                label="Password"
                xs={12}
            />

            {register && <GridField required as={TextField} name="team" id="auth-team" label="Team" xs={12} />}
            
        </AppFormPaper>
    );
};

export default AuthForm;
