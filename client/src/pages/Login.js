import React from 'react';
import AppLayout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import authService from '../services/authService';
import { interceptPage } from '../components/interceptPage';
import withShowError from '../components/withShowError';

const Login = ({ next, onLoginSuccess, user, notificationsProps, showError }) => {
    const { addNotification } = notificationsProps;
    return (
        <AppLayout user={user} {...notificationsProps}>
            <div className="center">
                <AuthForm
                    register={false}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={({ password, email }) => {
                        authService
                            .login(password, email)
                            .then(({ user }) => {
                                onLoginSuccess(user);
                                next();
                            })
                            .catch(showError);
                    }}
                />
            </div>
        </AppLayout>
    );
};

export default interceptPage(withShowError(Login));
