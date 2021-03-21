import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DRAWER_SECONDARY_WIDTH } from '../../styles/constants';
import { Drawer, Grid } from '@material-ui/core';
import { IconButton } from '../mui-styled/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { User, Children } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        secondaryDrawerBg: {
            width: '100%',
            minHeight: '100vh',
            position: 'fixed',
            backgroundColor: theme.palette.primary.main,
            opacity: 0.1,
            cursor: 'pointer',
            display: 'block',
            boxSizing: 'border-box',
            // opacity: 1,
            pointerEvents: 'all',
            zIndex: 10,
        },
        drawerSecondary: {
            maxWidth: '100%',
            width: DRAWER_SECONDARY_WIDTH,
            flexShrink: 0,
        },
        drawerSecondaryPaper: {
            maxWidth: '100%',
            width: DRAWER_SECONDARY_WIDTH,
            boxShadow: `0 4px 12px ${theme.palette.primary.light}`,
            // backgroundColor: theme.palette.primary.main,
            // color: theme.palette.primary.contrastText,
        },
    })
);

interface Props {
    user: User;
    open: boolean;
    toggleDrawer: (toggle: boolean) => void;
    children?: Children;
}

// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const SecondaryDrawer = ({ user, open, toggleDrawer, children }: Props) => {
    const classes = useStyles();

    return (
        <>
            {open && <div className={classes.secondaryDrawerBg} onClick={() => toggleDrawer(false)} />}
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
                    <IconButton onClick={() => toggleDrawer(false)}>
                        <CloseRoundedIcon color="inherit" />
                    </IconButton>
                </Grid>

                {children}
            </Drawer>
        </>
    );
};

export default SecondaryDrawer;
