import React from 'react';
import { useStyles } from '../../styles/main';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const getText = user => {
    return {
        login: !user ? 'Login' : `Signed in as ${user.publicName}`,
        logout: !user ? 'Sign up' : 'Log out',
    };
};

export const AuthButtonsHorizontal = ({ user }) => {
    let loginButton = (
        <Button color="inherit" href={!user ? '/login' : null}>
            {getText(user).login}
        </Button>
    );

    let signUpButton = (
        <Button color="inherit" href={!user ? '/register' : '/logout'}>
            {getText(user).logout}
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
            <ListItemText className={classes.textColorLight} primary={getText(user).login} />
        </ListItem>
    );

    let signUpButton = (
        <ListItem component={Link} to={!user ? '/register' : '/logout'}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText className={classes.textColorLight} primary={getText(user).logout} />
        </ListItem>
    );

    return (
        <List>
            {loginButton}
            {signUpButton}
        </List>
    );
};
