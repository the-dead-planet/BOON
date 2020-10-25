import React from 'react';
import { useStyles } from '../../styles/main';
import { Drawer, Grid } from '@material-ui/core';
import { IconButton } from '../mui-styled/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
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
                <Grid container justify="flex-end">
                    <IconButton onClick={toggleDrawer(false)}>
                        <CloseRoundedIcon color="inherit" />
                    </IconButton>
                </Grid>

                {children}
            </Drawer>
        </>
    );
};

export default SecondaryDrawer;
