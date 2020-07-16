import React from 'react';
import { useStyles } from '../../styles/main';
import { IconButton, Typography, Hidden } from '@material-ui/core';

interface Props {
    handleDrawerToggle: any;
}

export const Logo = ({ handleDrawerToggle }: Props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Hidden smDown>
                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    style={{ marginRight: "1em" }}
                >
                    <i className="optin monster icon" />
                </IconButton>
            </Hidden>

            <Hidden mdUp>
                <IconButton style={{ marginRight: "1em" }}>
                    <i className="optin monster icon" />
                </IconButton>
            </Hidden>
            <Typography variant="h6" style={{ width: "100px" }}>
                BOON
            </Typography>
        </React.Fragment>
    );
};
