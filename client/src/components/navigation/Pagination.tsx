import React from 'react';
import { useStyles } from '../../styles/main';
import { Grid, Toolbar, Typography } from '@material-ui/core';

interface Props {
    name?: string;
    date?: string;
}

const Pagination = ({ name, date }: Props) => {
    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar}>
            <Grid container justify="space-between" className={classes.pagination}>
                <Typography variant="h6" noWrap>
                    {name}
                </Typography>
                <Typography variant="h6" noWrap>
                    {date}
                </Typography>
            </Grid>
        </Toolbar>
    );
};

export default Pagination;
