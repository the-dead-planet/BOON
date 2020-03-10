import React from 'react';
import NotificationObject from '../logic/NotificationObject';

// Wrapp a component with `notificationProps` prop, inject a `showError` property
// parsing and queueing an error notifcation.
const withShowError = wrappedComponent => props => {
    const {
        notificationsProps: { addNotification },
    } = props;
    const showError = err => addNotification(NotificationObject.make(err.toString()));
    return wrappedComponent({ ...props, showError });
};

export default withShowError;
