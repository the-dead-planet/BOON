import { makeStyles, createStyles } from '@mui/styles';
import { DRAWER_SECONDARY_WIDTH } from '../../styles/constants';
import { Drawer, Grid, Theme } from '@mui/material';
import { IconButton } from '../mui-styled/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { User } from '../../logic/types';
import React from 'react';

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
    children?: React.ReactNode;
}

// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const SecondaryDrawer = ({ open, toggleDrawer, children }: Props) => {
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
                <Grid container justifyContent="flex-end">
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
