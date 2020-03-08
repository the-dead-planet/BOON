import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import authService from '../services/authService';
import NotificationObject from '../logic/NotificationObject';

const Logout = ({ user, onSuccess, notificationsProps }) => {
    const { addNotification } = notificationsProps;

    const [logoutRequestDone, setLogoutRequestDone] = useState(false);

    useEffect(() => {
        if (!logoutRequestDone) {
            authService
                .logout()
                .then(() => onSuccess())
                .catch(err => addNotification(NotificationObject.make(err.toString())))
                .finally(() => setLogoutRequestDone(true));
        }
    });

    if (logoutRequestDone) {
        return <Redirect to={'/'} />;
    } else {
        return (
            <AppLayout user={user} {...notificationsProps}>
                <h1>Logging you out</h1>
            </AppLayout>
        );
    }
};

export default Logout;
