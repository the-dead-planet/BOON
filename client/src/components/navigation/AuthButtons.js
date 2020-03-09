import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

let loginButton, signUpButton;

export const AuthButtonsHorizontal = ({ user }) => {

    loginButton =
        <Button color="inherit" href={!user ? "/login" : null}>
            {!user ? 'Login' : `Signed in as ${user.username}`}
        </Button>

    signUpButton =
        <Button color="inherit" href={!user ? "/register" : "/logout"}>
            {!user ? 'Sign up' : 'Log out'}
        </Button>

    return (
        <React.Fragment>
            {loginButton}
            {signUpButton}
        </React.Fragment>
    );
}


export const AuthButtonsVertical = ({ user }) => {

    loginButton =
        <ListItem component={Link} to={!user ? "/login" : null}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={!user ? 'Login' : `Signed in as ${user.username}`} />
        </ListItem>

    signUpButton =
        <ListItem component={Link} to={!user ? "/register" : "/logout"}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={!user ? 'Sign up' : 'Log out'} />
        </ListItem>



return (
    <List>
        {loginButton}
        {signUpButton}
    </List>
);
}