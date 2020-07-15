import React from 'react';
import AppLayout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import authService from '../services/authService';
import usersService from '../services/usersService';
import { interceptPage } from '../components/interceptPage';
import withShowError from '../components/withShowError';
import { User, NotificationProps, Mode } from '../logic/types';

/* Users can log in using either their e-mail (passport 'username') or their publicName
 If non-email address value entered, match with publicName and replace 'email' value 
 by matched user's username (=email) */
interface Props {
    next: any,
    onLoginSuccess: any,
    user: User,
    mode: Mode,
    setMode: any,
    notificationsProps: NotificationProps,
    showError: any,
}

const Login = ({ next, onLoginSuccess, user, mode, setMode, notificationsProps, showError }: Props) => {
    // const { addNotification } = notificationsProps;
    return (
        <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
            {/* <div className={classes.main}> */}
            <AuthForm
                register={false}
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={async ({ password, email }: { password: string, email: string }) => {
                    if (email.indexOf('@') === -1)
                        await usersService.getAll().then(users => {
                            let matchedUsers = users.filter((user: User) => user?.publicName === email);
                            email = matchedUsers.length > 0 ? matchedUsers[0].username : email;
                        });

                    authService
                        .login(password, email)
                        .then(({ user }) => {
                            onLoginSuccess(user);
                            next();
                        })
                        .catch(showError);
                }}
            />
            {/* </div> */}
        </AppLayout>
    );
};

export default interceptPage(withShowError(Login));
