import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH, JUMBOTRON_HEIGHT, TOOLBAR_HEIGHT } from '../styles/constants';
import { Hidden, Box, Typography, Container } from '@material-ui/core';
import MenuDrawer from '../components/navigation/MenuDrawer';
import Jumbotron from '../components/navigation/Jumbotron';
import SecondaryDrawer from '../components/navigation/SecondaryDrawer';
import { NavPanel, SideCol } from '../components/navigation/NavPanel';
import NavBarTop from '../components/navigation/NavBarTop';
import Footer from '../components/navigation/Footer';
import DialogMenu from '../components/navigation/DialogMenu';
import {
    Drawer,
    Mode,
    ThemeType,
    Jumbotron as JumbotronType,
    User,
    Page,
    NavPanel as NavPanelType,
    SideColumn,
    DialogProps,
    NavButton,
    Side,
} from '../logic/types';
import { APP_NAME } from '../constants/data';
import NotificationsRenderer from '../components/NotificationsRenderer';

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
        title: ({ side }: { side: Side | undefined }) => ({
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
                backdropFilter: 'blur(6px)',
                '-webkit-backdrop-filter': 'blur(6px)',
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
                borderRadius: '10px',
            },
        },
    })
);

export interface LayoutProps {
    user: User;
    children: React.ReactChild | React.ReactChildren | Array<React.ReactChild> | undefined;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
    // Appbar and jumbotron
    appBar?: boolean;
    jumbotron?: JumbotronType;
    quote?: string;
    // Pagination
    pagination?: Page;
    nextId?: string;
    previousId?: string;
    title?: string;
    // Left navigation panel
    createButton?: NavButton;
    navPanel?: NavPanelType;
    // Side newspaper column
    sideColumn?: SideColumn;
    // Secondary drawer
    drawer?: Drawer;
    secondaryDrawer?: any;
    secondaryDrawerOpen?: boolean;
    secondaryDrawerContent?: any;
    toggleSecondaryDrawer?: any;
    // Dialog Alert window
    dialog?: DialogProps;
    // Notifications
    notifications: any;
    onNotificationShown: any;
}

const LayoutContent = ({
    user,
    children,
    themeType,
    setThemeType,
    mode,
    setMode,
    // Appbar and jumbotron
    appBar,
    jumbotron,
    quote,
    // Pagination
    title,
    pagination,
    nextId, //TODO: check if still required
    previousId, //TODO: check if still required
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
    // Notifications
    notifications,
    onNotificationShown,
}: LayoutProps) => {
    const classes = useStyles({ side: navPanel?.side });

    // Drawer functions
    const [openMenu, setOpenMenu] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpenMenu(open);
    };

    return (
        <div className={clsx({ [classes.frosticContainer]: themeType === 'frostic' })}>
            {appBar && (
                <NavBarTop
                    user={user}
                    name={APP_NAME}
                    themeType={themeType}
                    setThemeType={setThemeType}
                    mode={mode}
                    setMode={setMode}
                    drawerVariant="persistent"
                    open={false}
                    toggleDrawer={toggleDrawer}
                    pagination={pagination}
                    quote={quote}
                />
            )}

            {themeType === 'frostic' && <div className={clsx({ ['frosticOffset']: themeType === 'frostic' })}></div>}

            {/* Menu drawer should include basic navigation buttons on small screens */}
            <MenuDrawer
                user={user}
                {...drawer}
                mode={mode}
                setMode={setMode}
                open={openMenu}
                toggleDrawer={toggleDrawer}
                createButton={createButton}
            />

            {/* Secondary drawer can include additional content like comments */}
            {secondaryDrawer && (
                <SecondaryDrawer user={user} open={secondaryDrawerOpen} toggleDrawer={toggleSecondaryDrawer}>
                    {secondaryDrawerContent}
                </SecondaryDrawer>
            )}

            {jumbotron && <Jumbotron {...jumbotron} />}

            <Container maxWidth="xl" className={classes.container}>
                <main
                    className={clsx({
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
                            <Hidden smDown>
                                <NavPanel
                                    user={user}
                                    themeType={themeType}
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
                        {sideColumn && <SideCol themeType={themeType} variant={navPanel?.variant} {...sideColumn} />}
                    </div>
                </main>
            </Container>

            <Footer themeType={themeType} />

            {dialog && <DialogMenu {...dialog} />}
            {/* TODO: style it nicer and allow moving to next/previous sprint */}
            <NotificationsRenderer notifications={notifications} onShown={onNotificationShown} />
        </div>
    );
};

export default LayoutContent;
