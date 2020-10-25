import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import EmailValidator from 'email-validator';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import { AppFormLayout, AppForm } from './App';
import { GridField } from './GridFields';
import { Mode } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        submitButton: {
            marginTop: '35px',
            width: '100%',
        },
    })
);

interface Props {
    mode: Mode;
    register: boolean;
    initialValues: object;
    onSubmit: any;
    error?: string;
}

// TODO: Add checkbox for 'stay logged in' and use cookies for keeping auth
// TODO: Consider adding one page with both login and register divided by a vertical Divider instead of two separate
const AuthForm = ({ mode, register, initialValues, onSubmit, error }: Props) => {
    const classes = useStyles();

    const validationSchema = (values: any) =>
        Yup.object().shape({
            email: Yup.string().email().required('Required'),
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
                submitSection={
                    <Button
                        variant={mode === 'dark' ? 'outlined' : 'contained'}
                        color={mode === 'dark' ? undefined : 'primary'}
                        type="submit"
                        className={classes.submitButton}
                    >
                        Submit
                    </Button>
                }
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
