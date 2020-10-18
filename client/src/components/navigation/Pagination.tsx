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

    return (
        <Toolbar className={classes.toolbar}>
            <Grid container justify="space-between" alignItems="center" className={classes.pagination}>
                <Typography noWrap style={{ width: '50%', maxWidth: '200px' }}>
                    {previousId && (
                        <Link to={`${path}/${previousId}`}>
                            <IconButton style={style} title="Previous" aria-label="previous">
                                <ChevronLeftIcon color="primary" />
                            </IconButton>
                        </Link>
                    )}
                    {primary || '-'}
                </Typography>

                <Hidden smDown>
                    <Grid item style={{ display: 'flex' }}>
                        {NAV_LINKS.map((item, i) => (
                            <Link key={i} to={item.path}>
                                <Typography
                                    color={i === 0 ? 'secondary' : 'inherit'}
                                    className={classes.navButton}
                                    style={{ width: '120px' }}
                                >
                                    {item.name}
                                </Typography>
                            </Link>
                        ))}
                    </Grid>
                </Hidden>

                <Typography noWrap style={{ width: '50%', maxWidth: '200px', textAlign: 'right' }}>
                    <Hidden smDown>{secondary || '-'}</Hidden>
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
