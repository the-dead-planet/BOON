import React from 'react';
import AppLayout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import authService from '../services/authService';
import { interceptPage } from '../components/interceptPage';
import NotificationObject from '../logic/NotificationObject';

const Login = ({ next, onLoginSuccess, user, notificationsProps }) => {
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
                            .catch(err => addNotification(new NotificationObject('login error', err.toString())));
                    }}
                />
            </div>
        </AppLayout>
    );
};

export default interceptPage(Login);
