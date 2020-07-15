import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton, Hidden } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DarkModeSwitch from '../DarkModeSwitch';
import { AuthButtonsVertical } from './AuthButtons';
import { PATHS } from '../../constants/data';
import { DrawerVariant, Mode, User } from '../../logic/types';

interface Props {
    user: User;
    mode: Mode;
    setDarkMode: any;
    open: boolean;
    toggleDrawer: any;
    variant?: DrawerVariant;
}

// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const MenuDrawer = ({ user, variant = 'temporary', mode, setDarkMode, open, toggleDrawer }: Props) => {
    const classes = useStyles();
    const { main } = PATHS;

    return (
        <Drawer
            className={classes.drawer}
            variant={variant}
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={toggleDrawer(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>

            <Divider />

            <List>
                <Link to={main}>
                    <ListItem button>
                        <ListItemText primary="Sprints" />
                    </ListItem>
                </Link>
            </List>
            <Hidden mdUp>
                <Divider />
                <AuthButtonsVertical user={user} />
            </Hidden>

            <Divider />
            <DarkModeSwitch style={{ marginLeft: 'auto' }} mode={mode} setDarkMode={setDarkMode} />
        </Drawer>
    );
};

export default MenuDrawer;
