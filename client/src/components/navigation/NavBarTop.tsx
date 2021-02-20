import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TOOLBAR_HEIGHT, DRAWER_WIDTH } from '../../styles/constants';
// import { Link } from '../../utils/Link';
import { Grid, AppBar, Toolbar, Typography, Hidden, Container } from '@material-ui/core';
import { IconButton } from '../mui-styled/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Pagination from './Pagination';
// import HideOnScroll from '../../utils/HideOnScroll';
import { AuthButtonsHorizontal } from './NavButtons';
import { Mode, ThemeType, User, DrawerVariant, Page } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            minHeight: `${TOOLBAR_HEIGHT}px`,
            position: 'relative',
        },
        logo: {
            minHeight: `${TOOLBAR_HEIGHT * 2}px`,
            [theme.breakpoints.only('xs')]: {
                minHeight: `${TOOLBAR_HEIGHT}px`,
                '& $prefix': {
                    display: 'none',
                },
            },
        },
        prefix: {},
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            boxShadow: 'none',
            // boxShadow: "0px 2px 4px -1px #fff, 0px 4px 5px 0px #fff, 0px 1px 10px 0px #fff",
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
                right: 0,
                [theme.breakpoints.down('sm')]: {
                    right: theme.spacing(2),
                },
            },
            '&$left': {
                left: 0,
                [theme.breakpoints.down('sm')]: {
                    left: theme.spacing(4),
                },
            },
        },
        hide: {
            display: 'none',
        },
        quote: {
            width: '250px',
            marginLeft: theme.spacing(3),
        },
        toRight: {
            marginLeft: 'auto',
        },
    })
);

interface Props {
    user: User;
    name: string;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
    drawerVariant: DrawerVariant;
    open: boolean;
    toggleDrawer: any;
    pagination?: Page;
    quote?: string;
}

const NavBarTop = ({
    user,
    name,
    themeType,
    setThemeType,
    mode,
    setMode,
    drawerVariant,
    open,
    toggleDrawer,
    pagination,
    quote,
}: Props) => {
    const classes = useStyles();

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
            <Container maxWidth="xl">
                <div
                    className={clsx({
                        ['frostic']: themeType === 'frostic',
                        ['rounded']: themeType === 'frostic',
                    })}
                >
                    <Toolbar className={clsx(classes.toolbar)}>
                        <Grid container justify="center">
                            <div className={`${classes.fix} ${classes.left}`}>
                                <Hidden mdUp>
                                    {/* Application menu icon */}
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
                                        <MenuIcon fontSize="small" />
                                    </IconButton>
                                </Hidden>

                                {quote && (
                                    <Hidden smDown>
                                        <div className={classes.quote}>
                                            <Typography variant="caption">{quote}</Typography>
                                        </div>
                                    </Hidden>
                                )}
                            </div>

                            {/* Centered text */}

                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                justify="center"
                                className={classes.logo}
                            >
                                <Typography variant="h6" noWrap className={classes.prefix}>
                                    — The —
                                </Typography>
                                <Typography variant="h4" noWrap>
                                    {name}
                                </Typography>
                            </Grid>

                            <div className={`${classes.fix} ${classes.right}`}>
                                <AuthButtonsHorizontal user={user} />
                            </div>
                        </Grid>
                    </Toolbar>

                    <Pagination {...pagination} />
                </div>
            </Container>
        </AppBar>
        // </HideOnScroll>
    );
};

export default NavBarTop;
