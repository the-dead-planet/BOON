import React from 'react';
import { useStyles } from '../../styles/main';
import { Drawer, Grid, Divider, Typography, IconButton } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { User, Children } from '../../logic/types';

interface Props {
    user: User;
    open: boolean;
    toggleDrawer: any;
    children?: Children;
}

// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const SecondaryDrawer = ({ user, open, toggleDrawer, children }: Props) => {
    const classes = useStyles();
    const anyProps: any = {};

    return (
        <>
            {open && <div className={classes.secondaryDrawerBg} onClick={toggleDrawer(false)} />}
            {/* TODO: repair css to transition nicely */}
            <Drawer
                className={classes.drawerSecondary}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerSecondaryPaper,
                }}
            >
                <Grid container justify="space-between">
                    <Typography color="secondary" variant="h6">
                        Opinions
                    </Typography>
                    <IconButton onClick={toggleDrawer(false)}>
                        <ChevronRightIcon color="inherit" />
                    </IconButton>
                </Grid>

                <Divider />

                {children}
            </Drawer>
        </>
    );
};

export default SecondaryDrawer;
