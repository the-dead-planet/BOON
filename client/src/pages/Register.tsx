import React from 'react';
import { Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import Layout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import { useServices } from '../services';
import * as AppState from '../app-state';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATHS } from '../constants/data';

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        container: {
            marginTop: '5em',
        },
    })
);

/**
 * Users can log in using either their e-mail (passport 'username') or their publicName.
 * If non-email address value entered, match with publicName and replace 'email' value by matched user's username (=email) 
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
                                navigate(searchParams.get('next') ?? PATHS.home, {});
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
