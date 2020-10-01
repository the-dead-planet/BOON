import React from 'react';
import { useStyles } from '../../styles/main';
import { Drawer, Divider, IconButton, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { User } from '../../logic/types';

interface Props {
    user: User;
    open: boolean;
    toggleDrawer: any;
}

// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const SecondaryDrawer = ({ user, open, toggleDrawer }: Props) => {
    const classes = useStyles();

    return (
        <>
            {open && <div className={classes.secondaryDrawerBg} onClick={toggleDrawer(false)} />}
            {/* TODO: repair css to transition nicely */}
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right" // TODO: on small screen change this to 'bottom' - also update className, or create a bottom drawer and use Hidden component
                open={open}
                onClose={toggleDrawer(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={toggleDrawer(false)}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>

                <Divider />

                <Typography>Comments section</Typography>
            </Drawer>
        </>
    );
};

export default SecondaryDrawer;
