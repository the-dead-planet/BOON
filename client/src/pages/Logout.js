import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import authService from '../services/authService';
import withShowError from '../components/withShowError';

const Logout = ({ user, onSuccess, notificationsProps, showError }) => {
    // const { addNotification } = notificationsProps;

    const [logoutRequestDone, setLogoutRequestDone] = useState(false);

    useEffect(() => {
        if (!logoutRequestDone) {
            authService
                .logout()
                .then(() => onSuccess())
                .catch(showError)
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

export default withShowError(Logout);
