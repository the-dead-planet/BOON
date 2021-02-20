import React from 'react';
import { withPush } from '../utils/routingDecorators';
import { guestPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
import Content from '../components/landing/Content';
import Header from '../components/landing/Header';
import { Mode, ThemeType, User, NotificationProps } from '../logic/types';

interface Props {
    user: User;
    themeType: ThemeType;
    mode: Mode;
    setMode: any;
    push: string;
    notificationsProps: NotificationProps;
    showError: any;
}

const Home = ({ user, themeType, mode, setMode, push, notificationsProps }: Props) => (
    <AppLayout user={user} themeType={themeType} mode={mode} setMode={setMode} {...notificationsProps}>
        <Header user={user} />

        <Content user={user} mode={mode} setMode={setMode} />
    </AppLayout>
);

export default guestPage(withPush(Home));
