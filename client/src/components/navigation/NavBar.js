import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import { MenuItemsHorizontal } from './MenuItems';
import { makeStyles } from '@material-ui/core/styles';
import { MenuDrawer } from './MenuDrawer';
import { Logo } from './Logo';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    background: {
        backgroundColor: '#1a1a1d',
    },
    hideMdUp: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    hideSmDown: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: theme.mixins.toolbar,
}));

export const NavBar = ({ user }) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <React.Fragment>
            <AppBar className={`${classes.background} ${classes.appBar}`} position="fixed">
                <Toolbar>
                    <Logo handleDrawerToggle={handleDrawerToggle} />

                    <Hidden smDown>
                        <MenuItemsHorizontal user={user} />
                    </Hidden>
                </Toolbar>
            </AppBar>

            <div className={classes.toolbar} />

            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden mdUp implementation="css">
                <MenuDrawer user={user} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            </Hidden>
        </React.Fragment>
    );
};
