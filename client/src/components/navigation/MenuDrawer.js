import React from 'react';
import { AuthButtonsVertical } from './AuthButtons';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MenuItemsVertical } from './MenuItems';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#290050',
        color: '#FFF'
    },
}));


export const MenuDrawer = ({ user, container, mobileOpen, handleDrawerToggle }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <div className={classes.toolbar} />
                <Divider />
                <MenuItemsVertical/>
                <Divider />
                <AuthButtonsVertical user={user} />
            </Drawer>
        </nav>
    );
}
