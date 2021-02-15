import React, { useState, useEffect } from 'react';
import { withPush } from '../utils/routingDecorators';
import { Redirect } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { AppFormLayout } from '../components/forms/App';
import { Typography, Fade } from '@material-ui/core';
import { useServices } from '../services';
import withShowError, { WithShowErrorInjectedProps } from '../utils/withShowError';
import { User, NotificationProps, Mode } from '../logic/types';
import { PATHS } from '../constants/data';
const { home } = PATHS;

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
    const { authService } = useServices()!;

    useEffect(() => {
        if (!logoutRequestDone) {
            setTimeout(() => {
                authService
                    .logout()
                    .then(() => onSuccess())
                    .catch(showError)
                    .finally(() => setLogoutRequestDone(true));
            }, 3000);
        }
    });

    if (logoutRequestDone) {
        return <Redirect to={home} />;
    } else {
        return (
            <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
                <AppFormLayout>
                    <Fade timeout={1000} in={true}>
                        <Typography variant="h4">Bye, bye, monster!</Typography>
                    </Fade>
                </AppFormLayout>
            </AppLayout>
        );
    }
};
// TODO: export the raw component from here, wrap it with HOCs in App.tsx.
// export default (withShowError as any)(Logout);

export default withPush(withShowError(Logout));
