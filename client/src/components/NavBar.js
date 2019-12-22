import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './NavBar.css'

const menuButtons = [
    // {
    //     name: "HOME",
    //     path: "/"
    // },
    {
        name: "DVLPMNTS",
        path: "/sprints"
    },
    {
        name: "SPTLGHT",
        path: "/spotlight"
    },
    {
        name: "TEAMS",
        path: "/teams"
    }
];

function NavBar(props) {
    var loginButton, signUpButton;

    if (!props.currentUser) {
        loginButton = <Button color="inherit" href="/login">Login</Button>
        signUpButton = <Button color="inherit" href="/register">Sign Up</Button>
    } else {
        loginButton = <Button color="inherit">Signed in as {props.currentUser}</Button>
        signUpButton = <Button color="inherit" href="/sprints">Log Out</Button>
    }

    return (
        <div className="container">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="logo">
                    <Link to={"/"} className="menu"><i className="optin monster icon" href="/" /> BOON</Link>
                    </Typography>
                    <div className="nav">
                        <div className="nav-left">
                            {menuButtons.map((button, index) => (
                                <Button key={index} color="inherit" href={button.path}>{button.name}</Button>
                            ))}
                        </div>
                        <div className="nav-left">
                            {loginButton}
                            {signUpButton}
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;