import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import authService from '../services/authService';
import withShowError, { WithShowErrorInjectedProps } from '../components/withShowError';
import { User, NotificationProps, Mode } from '../logic/types';

interface LogoutProps {
    onSuccess: any;
    user: User | undefined | null;
    mode: Mode;
    setMode: any;
    notificationsProps: NotificationProps;
    showError: any;
}

const Logout = ({ user, onSuccess, mode, setMode, notificationsProps, showError }: LogoutProps) => {
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

// TODO: export the raw component from here, wrap it with HOCs in App.tsx.
export default (withShowError as any)(Logout);
