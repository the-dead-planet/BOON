import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import * as AppState from '../app-state';
import * as Types from '../logic/types';

interface Props {
    notification: Types.Notification;
}

export const Notification: React.FC<Props> = ({ notification }) => {
    React.useEffect(() => {
        AppState.notificationHandler.triggerClear(notification.id);
    }, [notification.id]);

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            message={notification.message}
            open={true}
        />
    );
};
