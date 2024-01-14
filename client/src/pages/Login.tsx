import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import AppLayout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import { useServices } from '../services';
import * as Types from '../logic/types';
import { PATHS } from '../constants/data';

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        container: {
            marginTop: '5em',
        },
    })
);

interface Props {
    user: Types.User;
    mode: Types.Mode;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    onModeChange: (mode: Types.Mode) => void;
    next?: () => void;
    onLoginSuccess: (user: Types.User) => void;
    notificationsProps: Types.NotificationProps;
    showError: (err: Error) => void;
    location?: { path: string; search?: string };
}

/*
 * Users can log in using either their e-mail (passport 'username') or their publicName.
 * If non-email address value entered, match with publicName and replace 'email' value by matched user's username (=email) 
 */
export const Login = ({
    user,
    mode,
    themeType,
    onThemeTypeChange,
    onModeChange,
    onLoginSuccess,
    notificationsProps,
    ...props
}: Props) => {
    const classes = useStyles();
    const [error, setError] = useState('');
    const { authService } = useServices()!;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleErrorMessage = (err: Error) => {
        setError(err.message ?? 'uknown error');
        // setError(err.request.response);
    };

    return (
        <AppLayout
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
                    location={props.location}
                    error={error}
                    register={false}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={async ({ password, email }: { [key in string]: unknown }) => {
                        authService
                            .login(password as string, email as string)
                            .then(({ user }) => {
                                onLoginSuccess(user);
                                console.log('navigating', searchParams.get('next') ?? PATHS.home);
                                navigate(searchParams.get('next') ?? PATHS.home, {});
                            })
                            .catch(handleErrorMessage);
                    }}
                />
            </div>
        </AppLayout>
    );
};
