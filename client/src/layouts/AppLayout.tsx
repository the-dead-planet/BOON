import React, { useState } from 'react';
import clsx from 'clsx';
import { useStyles } from '../styles/main';
import { Hidden, Box, CssBaseline } from '@material-ui/core';
import ThemeWrapper from '../components/navigation/ThemeWrapper';
import Jumbotron from '../components/navigation/Jumbotron';
import MenuDrawer from '../components/navigation/MenuDrawer';
import SecondaryDrawer from '../components/navigation/SecondaryDrawer';
import NavBarLeft from '../components/navigation/NavBarLeft';
import NavBarTop from '../components/navigation/NavBarTop';
import Footer from '../components/navigation/Footer';
import {
    Drawer,
    Mode,
    Jumbotron as JumbotronType,
    User,
    Page,
    NavContent,
    SideColumn,
    MongoObject,
    Model,
    Comment as CommentType,
} from '../logic/types';
import { APP_NAME } from '../constants/data';
import NotificationsRenderer from '../components/NotificationsRenderer';

/*
  This component should serve as a wrapper for all pages. 
  Jumbotron and appBar are optional so the component can be use for layout with both, 
  with only jumbotron or only appBar or none of them but making use of the ThemeWrapper.
  Drawer allows additional properties, like variant. Not specified (default) is temporary. Other option is: persistent.
*/
interface Props {
    user: User;
    children: React.ReactChild | React.ReactChildren | Array<React.ReactChild> | undefined;
    jumbotron?: JumbotronType;
    drawer?: Drawer;
    appBar?: boolean;
    mode: Mode;
    setMode: any;
    navLeftContent?: NavContent;
    sideColumn?: SideColumn;
    secondaryDrawer?: any;
    secondaryDrawerOpen?: boolean;
    toggleSecondaryDrawer?: any;
    secondaryDrawerContent?: any;
    pagination?: Page;
    nextId?: string;
    previousId?: string;
    notifications: any;
    onNotificationShown: any;
}

const AppLayout = ({
    user,
    children,
    jumbotron,
    drawer,
    appBar,
    mode,
    setMode,
    pagination,
    navLeftContent,
    sideColumn,
    secondaryDrawer,
    secondaryDrawerOpen = false,
    toggleSecondaryDrawer,
    secondaryDrawerContent,
    notifications,
    onNotificationShown,
}: Props) => {
    const classes = useStyles();

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
        <ThemeWrapper mode={mode}>
            <CssBaseline />

            {appBar && (
                <NavBarTop
                    user={user}
                    name={APP_NAME}
                    mode={mode}
                    setMode={setMode}
                    drawerVariant="persistent"
                    open={false}
                    toggleDrawer={toggleDrawer}
                    pagination={pagination}
                />
            )}

            {/* Menu drawer should include basic navigation buttons on small screens */}
            <MenuDrawer
                user={user}
                {...drawer}
                mode={mode}
                setMode={setMode}
                open={openMenu}
                toggleDrawer={toggleDrawer}
            />

            {/* Secondary drawer can include additional content like comments */}
            {secondaryDrawer && (
                <SecondaryDrawer user={user} open={secondaryDrawerOpen} toggleDrawer={toggleSecondaryDrawer}>
                    {secondaryDrawerContent}
                </SecondaryDrawer>
            )}

            {jumbotron && <Jumbotron {...jumbotron} />}

            <main
                className={
                    drawer && drawer.variant === 'persistent'
                        ? clsx(classes.content, {
                              [classes.contentShift]: false,
                          })
                        : classes.contentPadding
                }
            >
                {/* Either display jumbotron or apply class to display contents under the NavBar */}
                {jumbotron && <div className={classes.jumbotron} />}
                {appBar && <div className={classes.drawerHeader} />}

                {/* Left panel serving as navigation - contents lists */}
                {navLeftContent && (
                    <Hidden smDown>
                        <NavBarLeft contents={navLeftContent} sideColumn={sideColumn} />
                    </Hidden>
                )}

                {/* Class 'mainContent' changes leftMargin to 0 in size sm */}
                <Box className={navLeftContent ? classes.moveContent : undefined}>{children}</Box>
            </main>

            <Footer />

            {/* TODO: style it nicer and allow moving to next/previous sprint */}
            <NotificationsRenderer notifications={notifications} onShown={onNotificationShown} />
        </ThemeWrapper>
    );
};

export default AppLayout;
