import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

// Simple snackbar notification displaying a message.
// TODO - create customized versions per notification kind.
const Notification = ({ message }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            message={message}
            autoHideDuration={5000}
        />
    );
};

export default Notification;
