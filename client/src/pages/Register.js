import React from 'react';
import AppLayout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import authService from '../services/authService';
import { interceptPage } from '../components/interceptPage';
import withShowError from '../components/withShowError';

const Register = ({ user, onSuccess, next, notificationsProps, showError }) => (
    <AppLayout user={user} {...notificationsProps}>
        <div className="center">
            <AuthForm
                register={true}
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    team: '',
                }}
                onSubmit={({ username, password, email, team }) => {
                    authService
                        .register(username, password, email, team)
                        .then(resp => {
                            const { user } = resp;
                            onSuccess(user);
                            next();
                        })
                        .catch(showError);
                }}
            />
        </div>
    </AppLayout>
);

export default interceptPage(withShowError(Register));
