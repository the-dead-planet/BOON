import React from 'react';
import AppLayout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import authService from '../services/authService';
import { interceptPage } from '../components/interceptPage';
import NotificationObject from '../logic/NotificationObject';

const Register = ({ user, onSuccess, next, notificationsProps }) => (
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
                        .catch(err => {
                            // TODO: structure errors returned from services, render form errors on respective fields
                            return notificationsProps.addNotification(NotificationObject.make(err.toString()));
                        });
                }}
            />
        </div>
    </AppLayout>
);

export default interceptPage(Register);
