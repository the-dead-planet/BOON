import React from 'react';
import Notification from './Notification';

// A simple component taking care of rendering the right amount of notifications.
const NotificationsRenderer = ({ notifications, onShown }) => {
    if (!Array.isArray(notifications)) {
        throw new Error(`Expected notifications to be an array, but received: ${notifications}`);
    }

    // Show one notification at a time.
    const notification = notifications[0];

    return notification !== undefined ? <Notification notification={notification} onShown={onShown} /> : null;
};

export default NotificationsRenderer;
