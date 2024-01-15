import { useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import Layout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import * as Types from '../logic/types';
import { useServices } from '../services';
import { Theme } from '@mui/material';

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        container: {
            marginTop: '5em',
        },
    })
);

interface Props {
    next?: () => void;
    onSuccess: (user: Types.User) => void;
    user: Types.User;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    mode: Types.Mode;
    onModeChange: (mode: Types.Mode) => void;
    notificationsProps: Types.NotificationProps;
    showError: (err: Error) => void;
    location?: { path: string; search?: string };
}

/**
 * Users can log in using either their e-mail (passport 'username') or their publicName.
 * If non-email address value entered, match with publicName and replace 'email' value by matched user's username (=email) 
 */
export const Register = ({
    user,
    themeType,
    onThemeTypeChange,
    mode,
    onModeChange,
    next,
    onSuccess,
    notificationsProps,
    location,
}: Props) => {
    const classes = useStyles();

    const [error, setError] = useState('');

    const { authService } = useServices()!;

    const setErrorMessage = (err: Error) => {
        setError(err.message ?? 'Unknown error');
        // setError(err.request.response);
    };

    return (
        <Layout
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
                    register={true}
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                    }}
                    onSubmit={({ username, password, email, team }: { [key in string]: unknown; }) => {
                        authService
                            .register(username as string, password as string, email as string, team as string)
                            .then((res) => {
                                const { user } = res;
                                onSuccess(user);
                                next?.();
                            })
                            .catch(setErrorMessage);
                    }}
                    error={error}
                />
            </div>
        </Layout>
    );
};
