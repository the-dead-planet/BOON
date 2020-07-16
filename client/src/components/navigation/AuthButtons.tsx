import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from 'react-router-dom';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { User } from '../../logic/types';
import { PATHS } from '../../constants/data';
// const { home, login, logout, register } = PATHS; // TODO:

// Set text on auth buttons dependent on whether a user is logged in or not
const getText = (user: User) => {
    return {
        register: !user ? 'Join the other side' : `Hey there, ${user.publicName}`,
        login: !user ? 'Show your face' : 'Exit the planet',
    };
};

interface Props {
    user: User,
    style?: object,
}

export const AuthButtonsHorizontal = ({ user, style }: Props) => {
    let signUpButton = (
        <Link to={!user ? '/register' : '/'}>
            <Button style={{ margin: "0 15px" }} color="inherit">
                {getText(user).register}
            </Button>
        </Link>
    );

    let loginButton = (
        <Link to={!user ? '/login' : '/logout'}>
            <Button variant="outlined" color="secondary">
                {getText(user).login}
            </Button>
        </Link>
    );

    return (
        <Box style={style}>
            {signUpButton}
            {loginButton}
        </Box>
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
        <List style={style} >
            {signUpButton}
            {loginButton}
        </List>
    );
}; 
