import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TOOLBAR_HEIGHT, DRAWER_WIDTH } from '../../styles/constants';
// import { Link } from '../../utils/Link';
import { Grid, AppBar, Toolbar, Typography, Hidden } from '@material-ui/core';
import { IconButton } from '../mui-styled/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Pagination from './Pagination';
// import HideOnScroll from '../../utils/HideOnScroll';
import { AuthButtonsHorizontal } from './NavButtons';
import { Mode, User, DrawerVariant, Page } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            minHeight: `${TOOLBAR_HEIGHT}px !important`,
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            boxShadow: 'none !important',
            // boxShadow: "0px 2px 4px -1px #fff, 0px 4px 5px 0px #fff, 0px 1px 10px 0px #fff !important",
        },
        appBarShift: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        left: {},
        right: {},
        fix: {
            position: 'absolute',
            '&$right': {
                right: '1em',
            },
            '&$left': {
                left: '2em',
            },
        },
        hide: {
            display: 'none',
        },
    })
);

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

                    <div className={`${classes.fix} ${classes.right}`}>
                        <AuthButtonsHorizontal style={style} user={user} />
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
