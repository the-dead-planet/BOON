import React from 'react';
import { useStyles } from '../../styles/main';
import { IconButton, Typography, Hidden } from '@material-ui/core';

interface Props {
    handleDrawerToggle: any;
}

export const Logo = ({ handleDrawerToggle }: Props) => {
    const classes = useStyles();
    const style = { marginRight: '1em' };
    const style2 = { width: '100px' };

    return (
        <React.Fragment>
            <Hidden smDown>
                <IconButton aria-label="open drawer" edge="start" onClick={handleDrawerToggle} style={style}>
                    <i className="optin monster icon" />
                </IconButton>
            </Hidden>

            <Hidden mdUp>
                <IconButton style={style}>
                    <i className="optin monster icon" />
                </IconButton>
            </Hidden>
            <Typography variant="h6" style={style2}>
                BOON
            </Typography>
        </React.Fragment>
    );
};
