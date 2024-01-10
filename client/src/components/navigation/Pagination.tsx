import { makeStyles, createStyles } from '@mui/styles';
import { TOOLBAR_HEIGHT } from '../../styles/constants';
import { Link } from '../../utils/Link';
import { Grid, Toolbar, Typography, Hidden, Tooltip, Theme } from '@mui/material';
import { TypographyLink } from '../mui-styled/Typography';
import { IconButton } from '../mui-styled/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Page } from '../../logic/types';
import { NAV_LINKS } from '../../constants/data';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            minHeight: `${TOOLBAR_HEIGHT}px`,
        },
        pagination: {
            borderTop: `solid 1.5px ${theme.palette.primary.main}`,
            borderBottom: `solid 1.5px ${theme.palette.primary.main}`,
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
        flex: {
            display: 'flex',
        },
    })
);

// TODO: Add a menu with
const Pagination = ({ path, primary, secondary, previousId, nextId }: Page) => {
    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar}>
            <Grid container justifyContent="space-between" alignItems="center" className={classes.pagination}>
                <Typography variant="body1" noWrap className={classes.paginationLink}>
                    {previousId && (
                        <Link to={`${path}/${previousId}`}>
                            <Tooltip title={`Previous ${path?.substring(1, path.length - 1)}`} aria-label="previous">
                                <IconButton aria-label="previous" className={classes.button}>
                                    <ChevronLeftIcon color="secondary" />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    )}
                    {primary || ''}
                </Typography>

                <Hidden smDown>
                    <Grid item className={classes.flex}>
                        {NAV_LINKS.map((item, i) => (
                            <Link key={i} to={item.path}>
                                <TypographyLink
                                    variant="body1"
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

                <Typography variant="body1" noWrap className={`${classes.paginationLink} ${classes.right}`}>
                    <Hidden smDown>{secondary || ''}</Hidden>
                    {nextId && (
                        <Link to={`${path}/${nextId}`}>
                            <Tooltip title={`Next ${path?.substring(1, path.length - 1)}`} aria-label="next">
                                <IconButton aria-label="next" className={classes.button}>
                                    <ChevronRightIcon color="secondary" />
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
