import React from 'react';
import classNames from 'classnames';
import { Container, Hidden, Box, Typography, Theme } from "@mui/material";
import { makeStyles, createStyles } from '@mui/styles';
import { DRAWER_WIDTH, JUMBOTRON_HEIGHT, TOOLBAR_HEIGHT } from '../styles/constants';
import MenuDrawer from '../components/navigation/MenuDrawer';
import Jumbotron from '../components/navigation/Jumbotron';
import SecondaryDrawer from '../components/navigation/SecondaryDrawer';
import { NavPanel, SideCol } from '../components/navigation/NavPanel';
import NavBarTop from '../components/navigation/NavBarTop';
import Footer from '../components/navigation/Footer';
import DialogMenu from '../components/navigation/DialogMenu';
import NotificationsRenderer from '../components/NotificationsRenderer';
import * as Types from '../logic/types';
import * as Hooks from '../hooks';
import * as AppState from '../app-state';
import { APP_NAME } from '../constants/data';

/*
  This component should serve as a wrapper for all pages. 
  Jumbotron and appBar are optional so the component can be use for layout with both, 
  with only jumbotron or only appBar or none of them but making use of the ThemeWrapper.
  Drawer allows additional properties, like variant. Not specified (default) is temporary. Other option is: persistent.
*/

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'relative',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -DRAWER_WIDTH,
            paddingBottom: '5em',
            minHeight: 'calc(100vh - 200px)',
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        contentPadding: {
            flexGrow: 1,
            padding: theme.spacing(3),
            paddingBottom: '5em',
            minHeight: 'calc(100vh - 200px)',
        },
        jumbotron: {
            minHeight: JUMBOTRON_HEIGHT,
        },
        drawerHeaderHeight: {
            minHeight: `${TOOLBAR_HEIGHT * 3}px`,
            [theme.breakpoints.only('xs')]: {
                minHeight: `${TOOLBAR_HEIGHT * 2}px`,
            },
        },
        mainContent: {
            display: 'flex',
            flexDirection: 'row',
            [theme.breakpoints.only('xs')]: {
                flexDirection: 'column',
            },
        },
        main: {
            width: '100%',
        },
        title: ({ side }: { side: Types.Side | undefined }) => ({
            textAlign: side || 'left',
        }),
        // Type 'Frostic' requires additional classes which are stored here and
        // referenced in further components as string classes.
        // Those classes are conditionally added based on the themeType prop
        frosticContainer: {
            '& .frosticOffset': {
                minHeight: '2em',
            },
            '& .frostic': {
                background: theme.palette.background.default,
                boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37)',
                backdropFilter: 'blur(10px)',
                '-webkit-backdrop-filter': 'blur(10px)',
                border: '1px solid rgba( 255, 255, 255, 0.18)',
                color: theme.palette.text.primary,
                '& button': {
                    color: theme.palette.text.primary,
                },
                '& *': {
                    borderColor: 'rgba(255, 255, 255, 0)',
                },
                '&::after': {
                    content: "''",
                    borderColor: theme.palette.text.primary,
                },
                '&::before': {
                    content: "''",
                    borderColor: 'rgba(255, 255, 255, 0)',
                },
            },
            '& .rounded': {
                borderRadius: '4px',
            },
        },
    })
);

export interface LayoutProps {
    // Appbar and jumbotron
    appBar?: boolean;
    jumbotron?: Types.Jumbotron;
    quote?: string;
    // Pagination
    pagination?: Types.Page;
    nextId?: string;
    previousId?: string;
    title?: string;
    // Left navigation panel
    createButton?:Types. NavButton;
    navPanel?: Types.NavPanel;
    // Side newspaper column
    sideColumn?: Types.SideColumn;
    // Secondary drawer
    drawer?: Types.Drawer;
    secondaryDrawer?: React.ReactNode;
    secondaryDrawerOpen?: boolean;
    secondaryDrawerContent?: React.ReactNode;
    toggleSecondaryDrawer?: (toggle: boolean) => void;
    // Dialog Alert window
    dialog?: Types.DialogProps;
    children?: React.ReactNode;
}

const LayoutContent: React.FC<LayoutProps> = ({
    // Appbar and jumbotron
    appBar,
    jumbotron,
    quote,
    // Pagination
    title,
    pagination,
    // nextId, //TODO: check if still required
    // previousId, //TODO: check if still required
    // Left navigation panel
    createButton,
    navPanel,
    // Side newspaper column
    sideColumn,
    // Secondary drawer
    drawer,
    secondaryDrawer,
    secondaryDrawerOpen = false,
    secondaryDrawerContent,
    toggleSecondaryDrawer,
    // Dialog Alert window
    dialog,
    children
}) => {
    const classes = useStyles({ side: navPanel?.side });
    const ui = Hooks.useSubject(AppState.ui$);

    // Drawer functions
    const [openMenu, setOpenMenu] = React.useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setOpenMenu(open);
    };

    return (
        <div className={classNames({ [classes.frosticContainer]: ui.theme === 'frostic' })}>
            {appBar && (
                <NavBarTop
                    name={APP_NAME}
                    drawerVariant="persistent"
                    open={false}
                    toggleDrawer={toggleDrawer}
                    pagination={pagination}
                    quote={quote}
                />
            )}

            {ui.theme === 'frostic' && <div className={classNames({ ['frosticOffset']: ui.theme === 'frostic' })}></div>}

            {/* Menu drawer should include basic navigation buttons on small screens */}
            <MenuDrawer
                {...drawer}
                open={openMenu}
                toggleDrawer={toggleDrawer}
                createButton={createButton}
            />

            {/* Secondary drawer can include additional content like comments */}
            {secondaryDrawer && toggleSecondaryDrawer ? (
                <SecondaryDrawer open={secondaryDrawerOpen} toggleDrawer={toggleSecondaryDrawer}>
                    {secondaryDrawerContent}
                </SecondaryDrawer>
            ) : null}

            {jumbotron && <Jumbotron {...jumbotron} />}

            <Container maxWidth="xl" className={classes.container}>
                <main
                    className={classNames({
                        [classes.contentShift]: false,
                        [classes.content]: drawer && drawer.variant === 'persistent',
                        [classes.contentPadding]: !(drawer && drawer.variant === 'persistent'),
                    })}
                >
                    {/* Either display jumbotron or apply class to display contents under the NavBar */}
                    {jumbotron && <div className={classes.jumbotron} />}
                    {appBar && <div className={classes.drawerHeaderHeight} />}

                    {/* Page title to go above the navigation side panel */}
                    {title && (
                        <Typography variant="h1" gutterBottom className={classes.title}>
                            {title}
                        </Typography>
                    )}

                    <div className={classes.mainContent}>
                        {/* Left panel serving as navigation - contents lists */}
                        {navPanel && (
                            <Hidden mdDown>
                                <NavPanel
                                    variant={navPanel?.variant}
                                    createButton={createButton}
                                    contents={navPanel.content}
                                    sideColumn={sideColumn}
                                />
                            </Hidden>
                        )}

                        {/* Class 'mainContent' changes leftMargin to 0 in size sm */}
                        <Box className={classes.main}>{children}</Box>

                        {/* Right panel serving as navigation - contents lists */}
                        {sideColumn && <SideCol variant={navPanel?.variant} {...sideColumn} />}
                    </div>
                </main>
            </Container>

            <Footer />

            {dialog && <DialogMenu {...dialog} />}
            {/* TODO: style it nicer and allow moving to next/previous sprint */}
            <NotificationsRenderer />
        </div>
    );
};

export default LayoutContent;
