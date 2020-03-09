import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MenuItemsHorizontal } from './MenuItems';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { MenuDrawer } from './MenuDrawer';
import { Logo } from './Logo';


const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: '#290050',
    },
    menu: {
        color: '#FFF',
        textDecoration: 'none',
    },
    button: {
        color: '#FFF',
        marginRight: theme.spacing(2)
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
}));

export const NavBar = () => {

    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <React.Fragment>
            <AppBar className={classes.background} position="static">
                <Toolbar>
                    <Logo handleDrawerToggle={handleDrawerToggle} />

                    <Hidden smDown>
                        <MenuItemsHorizontal />
                    </Hidden>

                </Toolbar>
            </AppBar>

            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden mdUp implementation="css">
                <MenuDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            </Hidden>
        </React.Fragment>
    );
}