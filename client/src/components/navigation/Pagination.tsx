import React from 'react';
import { useLocation } from 'react-router-dom';
import { useStyles } from '../../styles/main';
import { Grid, Toolbar, Typography } from '@material-ui/core';
import { PATHS } from '../../constants/data';

interface Props {
    name?: string;
    date?: string;
}

const Pagination = ({ name, date }: Props) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <Toolbar className={classes.toolbar}>
            <Grid container justify="space-between" className={classes.pagination}>
                <Typography color="primary" variant="h6" noWrap>
                    {name}
                </Typography>
                <Typography color="primary" variant="h6" noWrap>
                    {date}
                </Typography>
            </Grid>
        </Toolbar>
    );
};

export default Pagination;
