import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TOOLBAR_HEIGHT } from '../../styles/constants';
import { Link } from '../../utils/Link';
import { Grid, Toolbar, Typography, Hidden, Tooltip } from '@material-ui/core';
import { TypographyLink } from '../mui-styled/Typography';
import { IconButton } from '../mui-styled/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Page } from '../../logic/types';
import { NAV_LINKS } from '../../constants/data';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            minHeight: `${TOOLBAR_HEIGHT}px !important`,
        },
        pagination: {
            borderTop: `solid 2px ${theme.palette.primary.light}`,
            borderBottom: `solid 2px ${theme.palette.primary.light}`,
        },
        paginationLink: {
            width: '50%',
            maxWidth: '200px',
            '&$right': {
                textAlign: 'right',
            },
        },
        left: {},
        right: {},
        button: {
            padding: '.15em .2em',
        },
        menuLink: {
            width: '120px',
            textAlign: 'right',
        },
    })
);

// TODO: Add a menu with
const Pagination = ({ path, primary, secondary, list, currentId, previousId, nextId, links }: Page) => {
    const classes = useStyles();
    const flex = { display: 'flex' };

    return (
        <Toolbar className={classes.toolbar}>
            <Grid container justify="space-between" alignItems="center" className={classes.pagination}>
                <Typography noWrap className={classes.paginationLink}>
                    {previousId && (
                        <Link to={`${path}/${previousId}`}>
                            <Tooltip title={`Previous ${path?.substring(1, path.length - 1)}`} aria-label="previous">
                                <IconButton aria-label="previous" className={classes.button}>
                                    <ChevronLeftIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    )}
                    {primary || ''}
                </Typography>

                <Hidden smDown>
                    <Grid item style={flex}>
                        {NAV_LINKS.map((item, i) => (
                            <Link key={i} to={item.path}>
                                <TypographyLink
                                    color={
                                        path?.toUpperCase()?.indexOf(item.name.toUpperCase()) !== -1
                                            ? 'secondary'
                                            : 'inherit'
                                    }
                                    className={classes.menuLink}
                                >
                                    - {item.name} -
                                </TypographyLink>
                            </Link>
                        ))}
                    </Grid>
                </Hidden>

                <Typography noWrap className={`${classes.paginationLink} ${classes.right}`}>
                    <Hidden smDown>{secondary || ''}</Hidden>
                    {nextId && (
                        <Link to={`${path}/${nextId}`}>
                            <Tooltip title={`Next ${path?.substring(1, path.length - 1)}`} aria-label="next">
                                <IconButton aria-label="next" className={classes.button}>
                                    <ChevronRightIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    )}
                </Typography>
            </Grid>
        </Toolbar>
    );
};

export default Pagination;
