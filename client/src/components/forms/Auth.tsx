import React from 'react';
// import EmailValidator from 'email-validator';
import * as Yup from 'yup';
import { AppFormLayout, AppForm } from './App';
import { GridField } from './GridFields';
import { Mode } from '../../logic/types';

interface Props {
    mode: Mode;
    register: boolean;
    initialValues: object;
    onSubmit: any;
    error?: string;
}

// TODO: Add checkbox for 'stay logged in' and use cookies for keeping auth
const AuthForm = ({ mode, register, initialValues, onSubmit, error }: Props) => {
    const validationSchema = (values: any) =>
        Yup.object().shape({
            email: Yup.string()
                .email()
                .required('Required'),
            password: Yup.string()
                .required('No password provided.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
        });

    return (
        <AppFormLayout title={register ? 'Register' : 'Login'} error={error}>
            <AppForm
                mode={mode}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={register && validationSchema}
            >
                <GridField
                    mode={mode}
                    required
                    name="email"
                    id="auth-email"
                    label={`${!register ? 'Username / ' : ''}E-mail`}
                />

                {register && <GridField mode={mode} required name="username" id="auth-username" label="Username" />}

                <GridField mode={mode} required type="password" name="password" id="auth-password" label="Password" />
            </AppForm>
        </AppFormLayout>
    );
};

export default AuthForm;
