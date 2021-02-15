import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { guestPage } from '../utils/authenticatedPage';
import { interceptPage } from '../utils/interceptPage';
import AppLayout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import services from '../services/realImpl';
import { Mode, User, NotificationProps } from '../logic/types';

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
    setMode: any;
    next?: any;
    onLoginSuccess: any;
    notificationsProps: NotificationProps;
    showError: any;
    location?: { path: string; search?: string };
}

const Login = ({ user, mode, setMode, next, onLoginSuccess, notificationsProps, showError, location }: Props) => {
    const classes = useStyles();
    const [error, setError] = useState('');

    const setErrorMessage = (err: any) => {
        setError(err.request.response);
    };

    return (
        <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
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
                        services.authService
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
// export default interceptPage(withShowError(Login));
export default guestPage(interceptPage(Login));
