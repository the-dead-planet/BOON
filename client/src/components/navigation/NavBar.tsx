import React from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import { Grid, AppBar, Toolbar, Typography, IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Pagination from './Pagination';
import HideOnScroll from '../../utils/HideOnScroll';
import { AuthButtonsHorizontal } from './AuthButtons';
import { Mode, User, DrawerVariant, Page } from '../../logic/types';
import { PATHS } from '../../constants/data';
const { home, login, logout, register } = PATHS;

interface Props {
    user: User;
    name: string;
    mode: Mode;
    setMode: any;
    drawerVariant: DrawerVariant;
    open: boolean;
    handleDrawerOpen: any;
    handleDrawerClose: any;
    page?: Page;
}

const NavBar = ({
    user,
    name,
    mode,
    setMode,
    drawerVariant,
    open,
    handleDrawerOpen,
    handleDrawerClose,
    page,
}: Props) => {
    const classes = useStyles();
    const location = useLocation();
    const path = location.pathname;
    const style = { marginLeft: 'auto' };

    return (
        <HideOnScroll>
            <AppBar
                color="transparent"
                // position="absolute"
                className={
                    drawerVariant === 'persistent'
                        ? clsx(classes.appBar, {
                              [classes.appBarShift]: open,
                          })
                        : undefined
                }
            >
                <Toolbar className={classes.toolbar}>
                    <Grid container justify="center">
                        <div className={`${classes.fix} ${classes.left}`}>
                            <Hidden smUp>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    className={
                                        drawerVariant === 'persistent'
                                            ? clsx(classes.menuButton, open && classes.hide)
                                            : undefined
                                    }
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Hidden>

                            <Hidden smDown>
                                <Grid container>
                                    {[
                                        { name: 'Projects', path: home },
                                        { name: 'Teams', path: home },
                                    ].map((item) => (
                                        <Link to={item.path}>
                                            <Typography variant="body1" className={classes.navButton}>
                                                {item.name}
                                            </Typography>
                                        </Link>
                                    ))}
                                </Grid>
                            </Hidden>
                        </div>

                        {/* Centered text */}
                        <Typography variant="h6" noWrap>
                            The
                        </Typography>

                        {/* TODO: change texts to icons or something nicer */}
                        <div className={`${classes.fix} ${classes.right}`}>
                            <AuthButtonsHorizontal style={style} user={user} />
                        </div>
                    </Grid>
                </Toolbar>
                <Toolbar className={classes.toolbar}>
                    <Grid container justify="space-around">
                        <Link to={home}>
                            <Typography variant="h4" noWrap>
                                {name}
                            </Typography>
                        </Link>
                    </Grid>
                </Toolbar>

                <Pagination name={page?.name} date={page?.date} />
            </AppBar>
        </HideOnScroll>
    );
};

export default NavBar;
