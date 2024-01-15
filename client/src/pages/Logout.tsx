import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { AppFormLayout } from '../components/forms/App';
import { Typography, Fade } from '@mui/material';
import { useServices } from '../services';
import * as Types from '../logic/types';
import { PATHS } from '../constants/data';

interface LogoutProps {
    onSuccess: () => void;
    user: Types.User | undefined | null;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    mode: Types.Mode;
    onModeChange: (mode: Types.Mode) => void;
    notificationsProps: Types.NotificationProps;
    showError: (err: Error) => void;
}

export const Logout: React.FC<LogoutProps> = ({
    user,
    onSuccess,
    themeType,
    onThemeTypeChange,
    mode,
    onModeChange,
    notificationsProps,
    showError,
}) => {
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
    }, []);

    if (logoutRequestDone) {
        return <Navigate to={PATHS.home} />;
    } else {
        return (
            <AppLayout
                user={user}
                themeType={themeType}
                onThemeTypeChange={onThemeTypeChange}
                mode={mode}
                onModeChange={onModeChange}
                {...notificationsProps}
            >
                <AppFormLayout>
                    <Fade timeout={1000} in={true}>
                        <Typography variant="h4">Sad to see you go!</Typography>
                    </Fade>
                </AppFormLayout>
            </AppLayout>
        );
    }
};
