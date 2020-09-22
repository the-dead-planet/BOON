import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import { Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { IconUserSecret } from '../Icons';
import { User } from '../../logic/types';
// import { PATHS } from '../../constants/data';
// const { home, login, logout, register } = PATHS; // TODO:

// Set text on auth buttons dependent on whether a user is logged in or not
const getText = (user: User | null | undefined) => {
    return {
        register: !user ? 'Sign up' : `Howdy, ${user.publicName}!`,
        login: !user ? 'Login' : 'Logout',
    };
};

interface Props {
    user: User | null | undefined;
    style?: object;
}

export const AuthButtonsHorizontal = ({ user, style }: Props) => {
    const classes = useStyles();
    let signUpButton = (
        <Link to={!user ? '/register' : '/'}>
            <Typography className={classes.navButton} color="inherit">
                {getText(user).register}
            </Typography>
        </Link>
    );

    let loginButton = (
        <Link to={!user ? '/login' : '/logout'}>
            <Typography className={classes.navButton} color="secondary">
                {getText(user).login}
            </Typography>
        </Link>
    );

    return (
        <Grid container>
            {signUpButton}
            {loginButton}
            <IconUserSecret size="2x" />
        </Grid>
    );
};

export const AuthButtonsVertical = ({ user, style }: Props) => {
    const classes = useStyles();
    // TODO: resolve error 'div cannot be child of p'
    let signUpButton = (
        <ListItem button component={!user ? Link : Typography} to={!user ? '/register' : ''}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={getText(user).register} />
        </ListItem>
    );

    let loginButton = (
        <ListItem button component={Link} to={!user ? '/login' : '/logout'}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={getText(user).login} />
        </ListItem>
    );

    return (
        <List style={style}>
            {signUpButton}
            {loginButton}
        </List>
    );
};
