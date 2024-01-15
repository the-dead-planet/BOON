import React from 'react';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@mui/styles';
import { TOOLBAR_HEIGHT, DRAWER_WIDTH } from '../../styles/constants';
// import { Link } from '../../utils/Link';
import { Grid, AppBar, Toolbar, Typography, Hidden, Container, Theme } from '@mui/material';
import { IconButton } from '../mui-styled/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Pagination from './Pagination';
// import HideOnScroll from '../../utils/HideOnScroll';
import { AuthButtonsHorizontal } from './NavButtons';
import * as Types from '../../logic/types';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

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
                [theme.breakpoints.down('md')]: {
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
    name: string;
    drawerVariant: Types.DrawerVariant;
    open: boolean;
    toggleDrawer: (value: boolean) => () => void;
    pagination?: Types.Page;
    quote?: string;
}

const NavBarTop: React.FC<Props> = ({
    name,
    drawerVariant,
    open,
    toggleDrawer,
    pagination,
    quote,
}) => {
    const classes = useStyles();
    const ui = Hooks.useSubject(AppState.ui$);

    return (
        // <HideOnScroll>
        <AppBar
            color="transparent"
            position="absolute"
            className={
                drawerVariant === 'persistent'
                    ? classNames(classes.appBar, {
                          [classes.appBarShift]: false,
                      })
                    : undefined
            }
        >
            <Container maxWidth="xl">
                <div
                    className={classNames({
                        ['frostic']: ui.theme === 'frostic',
                        ['rounded']: ui.theme === 'frostic',
                    })}
                >
                    <Toolbar className={classNames(classes.toolbar)}>
                        <Grid container justifyContent="center">
                            <div className={classNames(classes.fix, classes.left)}>
                                <Hidden lgUp>
                                    {/* Application menu icon */}
                                    <IconButton
                                        aria-label="open drawer"
                                        onClick={toggleDrawer(true)}
                                        edge="start"
                                        className={
                                            drawerVariant === 'persistent'
                                                ? classNames(classes.menuButton, open && classes.hide)
                                                : undefined
                                        }
                                    >
                                        <MenuIcon fontSize="small" />
                                    </IconButton>
                                </Hidden>

                                {quote && (
                                    <Hidden mdDown>
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
                                justifyContent="center"
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
                                <AuthButtonsHorizontal />
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
