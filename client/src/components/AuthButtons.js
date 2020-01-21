import React from 'react';
import Button from '@material-ui/core/Button';

function AuthButtons(props) {
    var loginButton, signUpButton;

    if (!props.user) {
        loginButton = (
            <Button color="inherit" href="/login">
                Login
            </Button>
        );
        signUpButton = (
            <Button color="inherit" href="/register">
                Sign Up
            </Button>
        );
    } else {
        loginButton = <Button color="inherit">Signed in as {props.user.username}</Button>;
        signUpButton = (
            <Button color="inherit" href="/logout">
                Log Out
            </Button>
        );
    }

    return (
        <React.Fragment>
            {loginButton}
            {signUpButton}
        </React.Fragment>
    );
}

export default AuthButtons;
