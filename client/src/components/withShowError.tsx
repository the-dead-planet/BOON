import React from 'react';
import NotificationObject from '../logic/NotificationObject';
import { NotificationProps } from '../logic/types';

// Wrapp a component with `notificationProps` prop, inject a `showError` property
// parsing and queueing an error notifcation.
interface Props {
    notificationsProps: NotificationProps;
    onShown: any;
}
const withShowError = (wrappedComponent: any) => (props: Props) => {
    const {
        notificationsProps: { addNotification },
    } = props;
    const showError = (err: {}) => addNotification(NotificationObject.make(err.toString()));
    return wrappedComponent({ ...props, showError });
};

export default withShowError;
