import { useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { guestPage } from '../utils/authenticatedPage';
import Layout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import { Mode, User, NotificationProps, Auth, ThemeType } from '../logic/types';
import { useServices } from '../services';
import { Theme } from '@mui/material';

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
    themeType: ThemeType;
    onThemeTypeChange: (themeType: ThemeType) => void;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
    notificationsProps: NotificationProps;
    showError: any;
    location?: { path: string; search?: string };
}

const Register = ({
    user,
    themeType,
    onThemeTypeChange,
    mode,
    onModeChange,
    next,
    onSuccess,
    notificationsProps,
    showError,
    location,
}: Props) => {
    const classes = useStyles();

    const [error, setError] = useState('');

    const { authService } = useServices()!;

    const setErrorMessage = (err: { message: string; request: any }) => {
        setError(err.request.response);
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
// export default withShowError(Register);
// TODO: Rebuild intercept page
export default guestPage(Register);
