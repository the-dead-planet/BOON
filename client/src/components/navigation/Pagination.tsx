import React from 'react';
import { useStyles } from '../../styles/main';
import { Grid, Toolbar, Typography } from '@material-ui/core';
import { Page } from '../../logic/types';

interface Props {
    left: string;
    right?: string;
}

const Pagination = ({ primary, secondary }: Page) => {
    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar}>
            <Grid container justify="space-between" className={classes.pagination}>
                <Typography variant="h6" noWrap>
                    {primary}
                </Typography>
                <Typography variant="h6" noWrap>
                    {secondary || '-'}
                </Typography>
            </Grid>
        </Toolbar>
    );
};

export default Pagination;
