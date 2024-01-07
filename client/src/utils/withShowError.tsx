import React from 'react';
import NotificationObject from '../logic/NotificationObject';
import { NotificationProps } from '../logic/types';

// Wrapp a component with `notificationProps` prop, inject a `showError` property
// parsing and queueing an error notifcation.

// Props the input component should have.
interface WrappedComponentProps {
    notificationsProps: NotificationProps;
}

// Props added to the output.
export interface WithShowErrorInjectedProps {
    showError: (err: Error) => unknown[];
}

const withShowError = <Props extends WrappedComponentProps>(wrappedComponent: React.FC<Props>) => (props: Props) => {
    const {
        notificationsProps: { addNotification },
    } = props;
    const showError = (err: Error) => addNotification(NotificationObject.make(err.toString()));
    return wrappedComponent({ ...props, showError });
};

export default withShowError;
