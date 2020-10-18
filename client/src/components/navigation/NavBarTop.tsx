import React from 'react';
import clsx from 'clsx';
import { useStyles } from '../../styles/main';
// import { Link } from '../../utils/Link';
import { Grid, AppBar, Toolbar, Typography, IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Pagination from './Pagination';
// import HideOnScroll from '../../utils/HideOnScroll';
import { AuthButtonsHorizontal } from './NavButtons';
import { Mode, User, DrawerVariant, Page } from '../../logic/types';
import { QUOTES } from '../../constants/data';

interface Props {
    user: User;
    name: string;
    mode: Mode;
    setMode: any;
    drawerVariant: DrawerVariant;
    open: boolean;
    toggleDrawer: any;
    pagination?: Page;
    quote?: string;
}

const NavBarTop = ({ user, name, mode, setMode, drawerVariant, open, toggleDrawer, pagination, quote }: Props) => {
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

                        {quote && (
                            <Hidden smDown>
                                <div style={{ width: '250px' }}>
                                    <Typography variant="caption">{quote}</Typography>
                                </div>
                            </Hidden>
                        )}
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
