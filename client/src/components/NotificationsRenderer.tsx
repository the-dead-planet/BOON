import React from 'react';
import { Notification } from './Notification';
import * as AppState from '../app-state';
import * as Hooks from '../hooks';
import * as Types from '../logic/types';

/**
 * Shows one notification at a time.
 */
const NotificationsRenderer = () => {
    const notifications = Hooks.useSubject(AppState.notificationHandler.notifications$);
    const notification = React.useMemo((): Types.Notification | undefined => notifications[0], [notifications]);

    return notification ? <Notification notification={notification} /> : null;
};

export default NotificationsRenderer;
