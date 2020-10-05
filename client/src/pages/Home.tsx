import React from 'react';
import { useStyles } from '../styles/landing';
import { withPush } from '../utils/routingDecorators';
import { guestPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
import ThemeWrapper from '../components/navigation/ThemeWrapper';
import Content from '../components/landing/Content';
import Header from '../components/landing/Header';
import { Mode, User, NotificationProps } from '../logic/types';
import { PATHS } from '../constants/data';
const { register } = PATHS;

interface Props {
    user: User;
    mode: Mode;
    setMode: any;
    push: string;
    notificationsProps: NotificationProps;
    showError: any;
}

const Home = ({ user, mode, setMode, push, notificationsProps }: Props) => {
    const classes = useStyles();

    return (
        <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
            <Header />

            <Content
                user={user}
                mode={mode}
                setMode={setMode}
                title="Awesome landing page"
                subtitle="Start of the coolest project"
                button={{ name: 'Get started', path: register }}
            />
        </AppLayout>
    );
};

export default guestPage(withPush(Home));
