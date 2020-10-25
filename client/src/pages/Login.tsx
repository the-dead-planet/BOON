import React, { useState } from 'react';
import { guestPage } from '../utils/authenticatedPage';
import { interceptPage } from '../utils/interceptPage';
import AppLayout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import authService from '../services/authService';
// import usersService from '../services/usersService';
import { Mode, User, NotificationProps } from '../logic/types';

/* 
    Users can log in using either their e-mail (passport 'username') or their publicName
    If non-email address value entered, match with publicName and replace 'email' value 
    by matched user's username (=email) 
 */
interface Props {
    user: User;
    mode: Mode;
    setMode: any;
    next?: any;
    onLoginSuccess: any;
    notificationsProps: NotificationProps;
    showError: any;
}

const Login = ({ user, mode, setMode, next, onLoginSuccess, notificationsProps, showError }: Props) => {
    const [error, setError] = useState('');

    const setErrorMessage = (err: any) => {
        setError(err.request.response);
    };

    return (
        <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
            <AuthForm
                mode={mode}
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
        </AppLayout>
    );
};

// TODO: Repair guest page to work and redirect to the main page if user is logged in -> works with /home, here not
// export default interceptPage(withShowError(Login));
export default guestPage(interceptPage(Login));
