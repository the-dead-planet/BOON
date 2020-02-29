import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

// Simple snackbar notification displaying a message.
// TODO - create customized versions per notification kind.
const Notification = ({ notification, onShown }) => {
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

export default Notification;
