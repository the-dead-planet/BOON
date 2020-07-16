import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Notification as NotificationType } from '../logic/types';

// Simple snackbar notification displaying a message.
// TODO - create customized versions per notification kind.
interface Props {
    notification: NotificationType;
    onShown: any;
}
export const Notification = ({ notification, onShown }: Props) => {
    const { id, message } = notification;

    useEffect(() => {
        onShown(id);
    });

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            message={message}
            open={true}
        />
    );
};

// export default Notification;
