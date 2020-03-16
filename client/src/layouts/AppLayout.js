import React from 'react';
import { useStyles } from '../styles/main';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../styles/main';
import { NavBar } from '../components/navigation/NavBar';
import NotificationsRenderer from '../components/NotificationsRenderer';

const AppLayout = ({ user, children, notifications, onNotificationShown }) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.main}>
                <NavBar user={user} />
                {children}
                <NotificationsRenderer notifications={notifications} onShown={onNotificationShown} />
            </div>
        </ThemeProvider>
    );
};

export default AppLayout;
