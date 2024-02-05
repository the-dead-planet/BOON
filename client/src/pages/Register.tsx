import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import Layout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import { useServices } from '../services';
import * as Routes from '../routes';
import * as AppState from '../app-state';

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        container: {
            marginTop: '5em',
        },
    })
);

/**
 * Users can log in using either their e-mail (passport 'username') or their name.
 * If non-email address value entered, match with name and replace 'email' value by matched user's username (=email) 
 */
export const Register: React.FC = () => {
    const classes = useStyles();
    const { authService } = useServices()!;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <Layout>
            <div className={classes.container}>
                <AuthForm
                    register={true}
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                    }}
                    onSubmit={({ username, password, email, team }: { [key in string]: unknown; }) => {
                        authService
                            .register(username as string, password as string, email as string, team as string)
                            .then(({ user }) => {
                                AppState.user$.next(user)
                                navigate(searchParams.get('next') ?? Routes.Types.RouterPaths.Home, {});
                            })
                            .catch((err: Error) => {
                                AppState.notificationHandler.addNotification(err.message ?? 'Could not register user.');
                            });
                    }}
                />
            </div>
        </Layout>
    );
};
