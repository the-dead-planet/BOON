import React from 'react';
import AppLayout from '../layouts/AppLayout';
import AuthForm from '../components/forms/Auth';
import authService from '../services/authService';
import { interceptPage } from '../components/interceptPage';
import withShowError from '../components/withShowError';
import { User, NotificationProps, Mode } from '../logic/types';

interface Props {
    next: any;
    onSuccess: any;
    user: User;
    mode: Mode;
    setMode: any;
    notificationsProps: NotificationProps;
    showError: any;
}

const Register = ({ user, mode, setMode, onSuccess, next, notificationsProps, showError }: Props) => (
    <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
        <div>
            <AuthForm
                register={true}
                initialValues={
                    {
                        username: '',
                        email: '',
                        password: '',
                        team: '',
                    } as any
                }
                onSubmit={({
                    username,
                    password,
                    email,
                    team,
                }: {
                    username: string;
                    password: string;
                    email: string;
                    team: string;
                }) => {
                    authService
                        .register(username, password, email, team)
                        .then(resp => {
                            const { user } = resp;
                            onSuccess(user);
                            next();
                        })
                        .catch(showError);
                }}
            />
        </div>
    </AppLayout>
);

export default interceptPage(withShowError(Register));
