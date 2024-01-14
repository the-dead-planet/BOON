import { useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
// import { guestPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import { useServices } from '../services';
import { Mode, User, NotificationProps, ThemeType } from '../logic/types';
import { Theme } from '@mui/material';

/* 
    Users can log in using either their e-mail (passport 'username') or their publicName
    If non-email address value entered, match with publicName and replace 'email' value 
    by matched user's username (=email) 
 */

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        container: {
            marginTop: '5em',
        },
    })
);

interface Props {
    user: User;
    mode: Mode;
    themeType: ThemeType;
    onThemeTypeChange: (themeType: ThemeType) => void;
    onModeChange: (mode: Mode) => void;
    next?: () => void;
    onLoginSuccess: (user: User) => void;
    notificationsProps: NotificationProps;
    showError: (err: Error) => void;
    location?: { path: string; search?: string };
}

const Login = ({
    user,
    mode,
    themeType,
    onThemeTypeChange,
    onModeChange,
    next,
    onLoginSuccess,
    notificationsProps,
    location,
}: Props) => {
    const classes = useStyles();
    const [error, setError] = useState('');
    const { authService } = useServices()!;

    const setErrorMessage = (err: Error) => {
        setError(err.message ?? 'uknown error');
        // setError(err.request.response);
    };

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            onThemeTypeChange={onThemeTypeChange}
            mode={mode}
            onModeChange={onModeChange}
            {...notificationsProps}
        >
            <div className={classes.container}>
                <AuthForm
                    mode={mode}
                    location={location}
                    error={error}
                    register={false}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={async ({ password, email }: { [key in string]: unknown }) => {
                        authService
                            .login(password as string, email as string)
                            .then(({ user }) => {
                                onLoginSuccess(user);
                                next?.();
                            })
                            .catch(setErrorMessage);
                    }}
                />
            </div>
        </AppLayout>
    );
};

// TODO: Repair guest page to work and redirect to the main page if user is logged in -> works with /home, here not
// export default withShowError(Login);
export default Login;
// const GuestLogin = guestPage(Login);

// export default GuestLogin;
