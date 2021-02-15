import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { guestPage } from '../utils/authenticatedPage';
import { interceptPage } from '../utils/interceptPage';
import Layout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import { Mode, User, NotificationProps, Auth } from '../logic/types';
import { useServices } from '../services';

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
    next: any;
    onSuccess: any;
    user: User;
    mode: Mode;
    setMode: any;
    notificationsProps: NotificationProps;
    showError: any;
    location?: { path: string; search?: string };
}

const Register = ({ user, mode, setMode, next, onSuccess, notificationsProps, showError, location }: Props) => {
    const classes = useStyles();

    const [error, setError] = useState('');

    const { authService } = useServices()!;

    const setErrorMessage = (err: { message: string; request: any }) => {
        setError(err.request.response);
    };

    return (
        <Layout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
            <div className={classes.container}>
                <AuthForm
                    mode={mode}
                    location={location}
                    register={true}
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                    }}
                    onSubmit={({ username, password, email, team }: Auth) => {
                        authService
                            .register(username, password, email, team)
                            .then((res) => {
                                const { user } = res;
                                onSuccess(user);
                                next();
                            })
                            .catch(setErrorMessage);
                    }}
                    error={error}
                />
            </div>
        </Layout>
    );
};

// TODO: Repair guest page to work and redirect to the main page if user is logged in -> works with /home, here not
// export default interceptPage(withShowError(Register));
export default guestPage(interceptPage(Register));
