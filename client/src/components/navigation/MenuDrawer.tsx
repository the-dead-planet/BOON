import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
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
    setMode: any;
    open: boolean;
    toggleDrawer: any;
    variant?: DrawerVariant;
}

// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const MenuDrawer = ({ user, variant = 'temporary', mode, setMode, open, toggleDrawer }: Props) => {
    const classes = useStyles();
    const { home } = PATHS;

    const items = [
        {
            name: 'Home',
            path: home,
        },
    ];

    const style = { marginLeft: 'auto' };

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
                {items.map((item, i) => (
                    <Link key={i} to={item.path}>
                        <ListItem button>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Hidden mdUp>
                <Divider />
                <AuthButtonsVertical user={user} />
            </Hidden>

            <Divider />
            <DarkModeSwitch style={style} mode={mode} setMode={setMode} />
        </Drawer>
    );
};

export default MenuDrawer;
