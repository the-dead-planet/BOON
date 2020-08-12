import React, { useState } from 'react';
import { guestPage } from '../utils/authenticatedPage';
import { interceptPage } from '../utils/interceptPage';
import Layout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import authService from '../services/authService';
import usersService from '../services/usersService';
import { Mode, User, NotificationProps, Auth } from '../logic/types';

/* 
    Users can log in using either their e-mail (passport 'username') or their publicName
    If non-email address value entered, match with publicName and replace 'email' value 
    by matched user's username (=email) 
 */
interface Props {
    next: any;
    onSuccess: any;
    user: User;
    mode: Mode;
    setMode: any;
    notificationsProps: NotificationProps;
    showError: any;
}

const Register = ({ user, mode, setMode, next, onSuccess, notificationsProps, showError }: Props) => {
    const [error, setError] = useState('');

    const setErrorMessage = (err: { message: string; request: any }) => {
        setError(err.request.response);
    };

    return (
        <Layout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
            <AuthForm
                mode={mode}
                register={true}
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                }}
                onSubmit={({ username, password, email, team }: Auth) => {
                    authService
                        .register(username, password, email, team)
                        .then(res => {
                            const { user } = res;
                            onSuccess(user);
                            next();
                        })
                        .catch(setErrorMessage);
                }}
                error={error}
            />
        </Layout>
    );
};

// TODO: Repair guest page to work and redirect to the main page if user is logged in -> works with /home, here not
// export default interceptPage(withShowError(Register));
export default guestPage(interceptPage(Register));
