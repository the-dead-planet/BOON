import React, { useState } from 'react';
import Layout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import authService from '../services/authService';
import usersService from '../services/usersService';
import { interceptPage } from '../utils/interceptPage';
import { Mode, User, NotificationProps } from '../logic/types';

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
        <Layout
            user={user}
            mode={mode}
            setMode={setMode}
            notifications={notificationsProps}
            onNotificationShown={showError}
        >
            <AuthForm
                mode={mode}
                register={true}
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                }}
                onSubmit={({ username, password, email }: { username: string; password: string; email: string }) => {
                    authService
                        .register(username, password, email)
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

// export default interceptPage(withShowError(Register));
export default interceptPage(Register);
