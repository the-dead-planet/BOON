import React from 'react';
import AuthForm from '../components/forms/Auth';
import NavBar from '../components/NavBar';
import authService from '../services/authService';
import { interceptPage } from '../components/interceptPage';
import NotificationsRenderer from '../components/NotificationsRenderer';
import NotificationObject from '../logic/NotificationObject';

// NOTE: notification handling has been added here for testing / demonstration purposes.
// It should be extracted to a reusable component before applying to other pages.
// TODO: extract a `Layout` component handling common parts of each page, i.e. NavBar and Notification rendering,
// use it in all page/ components.
const Login = ({ next, onLoginSuccess, addNotification, user, notifications, onNotificationShown }) => {
    return (
        <div className="center">
            <NavBar user={user} />
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
            <NotificationsRenderer notifications={notifications} onShown={onNotificationShown} />}
        </div>
    );
};

export default interceptPage(Login);
