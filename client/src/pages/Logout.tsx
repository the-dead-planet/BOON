import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import authService from '../services/authService';
import withShowError from '../components/withShowError';
import { User, NotificationProps, Mode } from '../logic/types';

interface Props {
    next: any,
    onSuccess: any,
    user: User,
    mode: Mode,
    setMode: any,
    notificationsProps: NotificationProps,
    showError: any,
}

const Logout = ({ user, onSuccess, mode, setMode, notificationsProps, showError }: Props) => {
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
            <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
                <h1>Logging you out</h1>
            </AppLayout>
        );
    }
};

export default withShowError(Logout);
