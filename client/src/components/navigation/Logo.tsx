import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Typography, Hidden, Theme } from '@mui/material';
import { IconButton } from '../mui-styled/IconButton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            marginRight: theme.spacing(2),
        },
        title: {
            width: '100px',
        },
    })
);

interface Props {
    handleDrawerToggle: () => void;
}

export const Logo = ({ handleDrawerToggle }: Props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Hidden smDown>
                <IconButton aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.icon}>
                    <i className="optin monster icon" />
                </IconButton>
            </Hidden>

            <Hidden mdUp>
                <IconButton className={classes.icon}>
                    <i className="optin monster icon" />
                </IconButton>
            </Hidden>
            <Typography variant="h6" className={classes.title}>
                BOON
            </Typography>
        </React.Fragment>
    );
};
