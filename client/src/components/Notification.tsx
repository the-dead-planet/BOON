import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Notification as NotificationType } from '../logic/types';

// Simple snackbar notification displaying a message.
// TODO - create customized versions per notification kind.
interface Props {
    notification: NotificationType;
    onShown: (notificationId: string) => void;
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
