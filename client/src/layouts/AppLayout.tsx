import React, { useState } from 'react';
import clsx from 'clsx';
import { useStyles } from '../styles/main';
import { BottomNav } from '../components/navigation/BottomNav';
import ThemeWrapper from '../components/navigation/ThemeWrapper';
import Jumbotron from '../components/navigation/Jumbotron';
import MenuDrawer from '../components/navigation/MenuDrawer';
import NavBarLeft from '../components/navigation/NavBarLeft';
import NavBarTop from '../components/navigation/NavBarTop';
import { Drawer, Mode, Jumbotron as JumbotronType, User, Page } from '../logic/types';
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
    navLeftContent?: Array<{
        header: string;
        list: Array<{
            id: string;
            name: string;
            path: string;
            hash?: boolean; // if path is refering to an id of any of the html components on the page, use HashLink, otherwise use Link
        }>;
        activeId?: string;
    }>;
    sideColumn?: {
        header: string;
        body: string;
    };
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
    notifications,
    onNotificationShown,
}: Props) => {
    const classes = useStyles();

    // Drawer functions
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpen(open);
    };

    return (
        <ThemeWrapper mode={mode}>
            {appBar && (
                <NavBarTop
                    user={user}
                    name={APP_NAME}
                    mode={mode}
                    setMode={setMode}
                    drawerVariant="persistent"
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                    pagination={pagination}
                />
            )}

            <MenuDrawer user={user} {...drawer} mode={mode} setMode={setMode} open={open} toggleDrawer={toggleDrawer} />

            {jumbotron && <Jumbotron {...jumbotron} />}

            <main
                className={
                    drawer && drawer.variant === 'persistent'
                        ? clsx(classes.content, {
                              [classes.contentShift]: open,
                          })
                        : classes.contentPadding
                }
            >
                <div className={jumbotron ? classes.jumbotron : classes.drawerHeader} />

                {navLeftContent && <NavBarLeft contents={navLeftContent} sideColumn={sideColumn} />}

                {children}
            </main>

            {/* TODO: style it nicer and allow moving to next/previous sprint */}
            {/* <BottomNav user={user} /> */}
            <NotificationsRenderer notifications={notifications} onShown={onNotificationShown} />
        </ThemeWrapper>
    );
};

export default AppLayout;
