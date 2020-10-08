import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import { Grid, Toolbar, Typography, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Page } from '../../logic/types';

// TODO: Add a menu with
const Pagination = ({ path, primary, secondary, list, currentId, previousId, nextId }: Page) => {
    const classes = useStyles();
    const style = { padding: '.15em .2em' };

    return (
        <Toolbar className={classes.toolbar}>
            <Grid container justify="space-between" className={classes.pagination}>
                <Typography variant="h6" noWrap>
                    {previousId && (
                        <Link to={`${path}/${previousId}`}>
                            <IconButton style={style} title="Previous" aria-aria-label="previous">
                                <ChevronLeftIcon color="primary" />
                            </IconButton>
                        </Link>
                    )}
                    {primary || '-'}
                </Typography>
                <Typography variant="h6" noWrap>
                    {secondary || '-'}
                    {nextId && (
                        <Link to={`${path}/${nextId}`}>
                            <IconButton style={style} title="Next" aria-label="next">
                                <ChevronRightIcon color="primary" />
                            </IconButton>
                        </Link>
                    )}
                </Typography>
            </Grid>
        </Toolbar>
    );
};

export default Pagination;
