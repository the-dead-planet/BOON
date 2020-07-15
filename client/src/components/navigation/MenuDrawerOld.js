import React from 'react';
import { useStyles } from '../../styles/main';
import { AuthButtonsVertical } from './AuthButtons';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { MenuItemsVertical } from './MenuItems';

export const MenuDrawer = ({ user, container, mobileOpen, handleDrawerToggle }) => {
    const classes = useStyles();

    return (
        <Drawer
            container={container}
            variant="temporary"
            // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
                paper: `${classes.drawerPaper} ${classes.bgDark}`,
            }}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
        >
            <div className={classes.toolbar} />
            <Divider />
            <MenuItemsVertical />
            <Divider />
            <AuthButtonsVertical user={user} />
        </Drawer>
    );
};
