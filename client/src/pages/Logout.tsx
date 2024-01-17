import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { AppFormLayout } from '../components/forms/App';
import { Typography, Fade } from '@mui/material';
import { useServices } from '../services';
import * as Routes from '../routes';
import * as AppState from '../app-state';

export const Logout: React.FC = () => {
    const [logoutRequestDone, setLogoutRequestDone] = useState(false);
    const { authService } = useServices()!;

    useEffect(() => {
        if (!logoutRequestDone) {
            setTimeout(() => {
                authService
                    .logout()
                    .then(() => {
                        AppState.user$.next(null);
                    })
                    .catch((err: Error) => {
                        AppState.notificationHandler.addNotification(err.message ?? 'Could not log out.');
                    })
                    .finally(() => setLogoutRequestDone(true));
            }, 3000);
        }
    }, []);

    if (logoutRequestDone) {
        return <Navigate to={Routes.Types.RouterPaths.Home} />;
    } else {
        return (
            <AppLayout>
                <AppFormLayout>
                    <Fade timeout={1000} in={true}>
                        <Typography variant="h4">Sad to see you go!</Typography>
                    </Fade>
                </AppFormLayout>
            </AppLayout>
        );
    }
};
