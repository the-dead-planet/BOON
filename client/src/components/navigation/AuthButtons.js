import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    link: {
        color: '#f0e1e7',
        textDecoration: 'none',
    },
}));
let loginButton, signUpButton;


export const AuthButtonsHorizontal = ({ user }) => {
    const classes = useStyles();
    loginButton =
        <Button className={classes.link} color="inherit" href={!user ? "/login" : null}>
            {!user ? 'Login' : `Signed in as ${user.username}`}
        </Button>

    signUpButton =
        <Button className={classes.link} color="inherit" href={!user ? "/register" : "/logout"}>
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
    const classes = useStyles();
    loginButton =
        <ListItem className={classes.link} component={Link} to={!user ? "/login" : null}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText className={classes.link} primary={!user ? 'Login' : `Signed in as ${user.username}`} />
        </ListItem>

    signUpButton =
        <ListItem className={classes.link} component={Link} to={!user ? "/register" : "/logout"}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText className={classes.link} primary={!user ? 'Sign up' : 'Log out'} />
        </ListItem>



return (
    <List>
        {loginButton}
        {signUpButton}
    </List>
);
}