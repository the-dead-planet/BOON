import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    logo: {
        width: '100px',
    },
    menu: {
        color: '#f0e1e7',
        textDecoration: 'none',
    },
    button: {
        color: '#f0e1e7',
        marginRight: theme.spacing(2)
    },
    hideMdUp: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    hideSmDown: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export const Logo = ({ menuItems, handleDrawerToggle}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={`${classes.button} ${classes.hideSmDown}`}
            >
                <i className="optin monster icon" href="/" />
            </IconButton>
            
            <IconButton className={`${classes.button} ${classes.hideMdUp}`}>
                <i className="optin monster icon" href="/" />
            </IconButton>
            <Link to={'/'} className={classes.menu}>
                <Typography variant="h6" className={classes.logo}>BOON</Typography>
            </Link>

        </React.Fragment>
    );
}
