import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import { Grid, Toolbar, Typography, IconButton, Hidden } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Page } from '../../logic/types';
import { NAV_LINKS } from '../../constants/data';

// TODO: Add a menu with
const Pagination = ({ path, primary, secondary, list, currentId, previousId, nextId, links }: Page) => {
    const classes = useStyles();
    const style = { padding: '.15em .2em' };
    const flex = { display: 'flex' };
    const width = { width: '120px' };

    return (
        <Toolbar className={classes.toolbar}>
            <Grid container justify="space-between" alignItems="center" className={classes.pagination}>
                <Typography noWrap className={classes.paginationLink}>
                    {previousId && (
                        <Link to={`${path}/${previousId}`}>
                            <IconButton style={style} title="Previous" aria-label="previous">
                                <ChevronLeftIcon color="primary" />
                            </IconButton>
                        </Link>
                    )}
                    {primary || ''}
                </Typography>

                <Hidden smDown>
                    <Grid item style={flex}>
                        {NAV_LINKS.map((item, i) => (
                            <Link key={i} to={item.path}>
                                <Typography
                                    color={
                                        path?.toUpperCase()?.indexOf(item.name.toUpperCase()) !== -1
                                            ? 'secondary'
                                            : 'inherit'
                                    }
                                    className={classes.navButton}
                                    style={width}
                                >
                                    - {item.name} -
                                </Typography>
                            </Link>
                        ))}
                    </Grid>
                </Hidden>

                <Typography noWrap className={`${classes.paginationLink} ${classes.right}`}>
                    <Hidden smDown>{secondary || ''}</Hidden>
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
