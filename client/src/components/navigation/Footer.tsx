import React from 'react';
import { useStyles } from '../../styles/main';
// import { Link } from '../../utils/Link';
import { Grid } from '@material-ui/core';

const Footer = () => {
    const classes = useStyles();

    return (
        <Grid container justify="space-around" alignItems="center" className={classes.footer}>
            <div>Footer content</div>
        </Grid>
    );
};

export default Footer;
