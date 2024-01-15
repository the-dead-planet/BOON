import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import * as AppState from '../app-state';
import AppLayout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import { useServices } from '../services';
import { PATHS } from '../constants/data';

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        container: {
            marginTop: '5em',
        }
    })
);

/*
 * Users can log in using either their e-mail (passport 'username') or their publicName.
 * If non-email address value entered, match with publicName and replace 'email' value by matched user's username (=email) 
 */
export const Login: React.FC = () => {
    const classes = useStyles();
    const { authService } = useServices()!;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <AppLayout>
            <div className={classes.container}>
                <AuthForm
                    register={false}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={async ({ password, email }: { [key in string]: unknown }) => {
                        authService
                            .login(password as string, email as string)
                            .then(({ user }) => {
                                AppState.user$.next(user)
                                navigate(searchParams.get('next') ?? PATHS.home, {});
                            })
                            .catch((err: Error) => {
                                AppState.notificationHandler.addNotification(err.message ?? 'Could not log in user.');
                            });
                    }}
                />
            </div>
        </AppLayout>
    );
};
