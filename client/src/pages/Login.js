import React from 'react';
import AuthForm from '../components/forms/AuthForm';
import NavBar from '../components/NavBar';
import authService from '../services/authService';
import { interceptPage } from '../components/interceptPage';
import Notification from '../components/Notification';
import NotificationObject from '../logic/NotificationObject';

// NOTE: notification handling has been added here for testing / demonstration purposes.
// It should be extracted to a reusable component before applying to other pages.
// TODO: extract a `Layout` component handling common parts of each page, i.e. NavBar and Notification rendering,
// use it in all page/ components.
const Login = ({ next, onLoginSuccess, addNotification, user, notifications, onNotificationShown }) => {
    const notification = notifications.length ? notifications[0] : null;
    return (
        <div className="center">
            <NavBar user={user} />
            <AuthForm
                type="login"
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
            {notification && <Notification notification={notification} onShown={onNotificationShown} />}
        </div>
    );
};

export default interceptPage(Login);
