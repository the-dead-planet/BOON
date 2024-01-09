import { useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { guestPage } from '../utils/authenticatedPage';
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

const useStyles = makeStyles((theme: Theme) =>
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
    next?: any;
    onLoginSuccess: any;
    notificationsProps: NotificationProps;
    showError: any;
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
    showError,
    location,
}: Props) => {
    const classes = useStyles();
    const [error, setError] = useState('');
    const { authService } = useServices()!;

    const setErrorMessage = (err: any) => {
        setError(err.request.response);
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
                    onSubmit={async ({ password, email }: { password: string; email: string }) => {
                        authService
                            .login(password, email)
                            .then(({ user }) => {
                                onLoginSuccess(user);
                                next();
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
export default guestPage(Login);
