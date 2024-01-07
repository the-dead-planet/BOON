import { useState, useEffect } from 'react';
import { withPush } from '../utils/routingDecorators';
import { Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { AppFormLayout } from '../components/forms/App';
import { Typography, Fade } from '@mui/material';
import { useServices } from '../services';
import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, ThemeType } from '../logic/types';
import { PATHS } from '../constants/data';
const { home } = PATHS;

interface LogoutProps {
    onSuccess: any;
    user: User | undefined | null;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
    notificationsProps: NotificationProps;
    showError: any;
}

const Logout = ({
    user,
    onSuccess,
    themeType,
    setThemeType,
    mode,
    setMode,
    notificationsProps,
    showError,
}: LogoutProps) => {
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
        return <Navigate to={home} />;
    } else {
        return (
            <AppLayout
                user={user}
                themeType={themeType}
                setThemeType={setThemeType}
                mode={mode}
                setMode={setMode}
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
// TODO: export the raw component from here, wrap it with HOCs in App.tsx.
// export default (withShowError as any)(Logout);

export default withPush(withShowError(Logout));
