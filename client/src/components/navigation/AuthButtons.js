import React from 'react';
import { useStyles } from '../../styles/main';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

export const AuthButtonsHorizontal = ({ user }) => {
    const classes = useStyles();

    let loginButton = (
        <Button color="inherit" href={!user ? '/login' : null}>
            {!user ? 'Login' : `Signed in as ${user.username}`}
        </Button>
    );

    let signUpButton = (
        <Button color="inherit" href={!user ? '/register' : '/logout'}>
            {!user ? 'Sign up' : 'Log out'}
        </Button>
    );

    return (
        <React.Fragment>
            {loginButton}
            {signUpButton}
        </React.Fragment>
    );
};

export const AuthButtonsVertical = ({ user }) => {
    const classes = useStyles();

    let loginButton = (
        <ListItem component={Link} to={!user ? '/login' : '/'}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText
                className={classes.textColorLight}
                primary={!user ? 'Login' : `Signed in as ${user.username}`}
            />
        </ListItem>
    );

    let signUpButton = (
        <ListItem component={Link} to={!user ? '/register' : '/logout'}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText className={classes.textColorLight} primary={!user ? 'Sign up' : 'Log out'} />
        </ListItem>
    );

    return (
        <List>
            {loginButton}
            {signUpButton}
        </List>
    );
};
