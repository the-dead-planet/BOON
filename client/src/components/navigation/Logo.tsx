import React from 'react';
import { useStyles } from '../../styles/main';
import { Typography, Hidden } from '@material-ui/core';
import { IconButton } from '../mui-styled/IconButton';

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
                <IconButton color="primary" style={style}>
                    <i className="optin monster icon" />
                </IconButton>
            </Hidden>
            <Typography variant="h6" style={style2}>
                BOON
            </Typography>
        </React.Fragment>
    );
};
