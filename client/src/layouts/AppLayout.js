import React from 'react';
import { NavBar } from '../components/navigation/NavBar';
import NotificationsRenderer from '../components/NotificationsRenderer';

const AppLayout = ({ user, children, notifications, onNotificationShown }) => (
    <div>
        <NavBar user={user} />
        {children}
        <NotificationsRenderer notifications={notifications} onShown={onNotificationShown} />
    </div>
);

export default AppLayout;
