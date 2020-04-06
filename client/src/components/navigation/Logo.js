import React from 'react';
import { useStyles } from '../../styles/main';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

export const Logo = ({ handleDrawerToggle }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={`${classes.textColorLight} ${classes.spacingRight} ${classes.hideSmDown}`}
            >
                <i className="optin monster icon" href="/" />
            </IconButton>

            <IconButton className={`${classes.textColorLight} ${classes.spacingRight} ${classes.hideMdUp}`}>
                <i className="optin monster icon" href="/" />
            </IconButton>
            <Typography variant="h6" className={classes.width100}>
                BOON
            </Typography>
        </React.Fragment>
    );
};
