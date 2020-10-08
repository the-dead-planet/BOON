import React from 'react';
import clsx from 'clsx';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import { Grid, AppBar, Toolbar, Typography, IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Pagination from './Pagination';
// import HideOnScroll from '../../utils/HideOnScroll';
import { AuthButtonsHorizontal } from './NavButtons';
import { Mode, User, DrawerVariant, Page } from '../../logic/types';
import { NAV_LINKS } from '../../constants/data';

interface Props {
    user: User;
    name: string;
    mode: Mode;
    setMode: any;
    drawerVariant: DrawerVariant;
    open: boolean;
    toggleDrawer: any;
    pagination?: Page;
}

const NavBarTop = ({ user, name, mode, setMode, drawerVariant, open, toggleDrawer, pagination }: Props) => {
    const classes = useStyles();
    const style = { marginLeft: 'auto' };

    return (
        // <HideOnScroll>
        <AppBar
            color="transparent"
            position="absolute"
            className={
                drawerVariant === 'persistent'
                    ? clsx(classes.appBar, {
                          [classes.appBarShift]: false,
                      })
                    : undefined
            }
        >
            <Toolbar className={classes.toolbar}>
                <Grid container justify="center">
                    <div className={`${classes.fix} ${classes.left}`}>
                        <Hidden mdUp>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer(true)}
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
                                {NAV_LINKS.map((item, i) => (
                                    <Link key={i} to={item.path}>
                                        <Typography
                                            variant="body1"
                                            color={i === 0 ? 'secondary' : 'inherit'}
                                            className={classes.navButton}
                                        >
                                            {item.name}
                                        </Typography>
                                    </Link>
                                ))}
                            </Grid>
                        </Hidden>
                    </div>

                    {/* Centered text */}
                    <Typography variant="h6" noWrap>
                        — The —
                    </Typography>

                    {/* TODO: change texts to icons or something nicer */}

                    <div className={`${classes.fix} ${classes.right}`}>
                        <Hidden smDown>
                            <AuthButtonsHorizontal style={style} user={user} />
                        </Hidden>
                    </div>
                </Grid>
            </Toolbar>
            <Toolbar className={classes.toolbar}>
                <Grid container justify="space-around">
                    <Typography variant="h4" noWrap>
                        {name}
                    </Typography>
                </Grid>
            </Toolbar>

            <Pagination {...pagination} />
        </AppBar>
        // </HideOnScroll>
    );
};

export default NavBarTop;
