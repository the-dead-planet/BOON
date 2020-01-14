import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AuthButtons from './AuthButtons';
import '../styles/NavBar.css';

// var today = new Date().toISOString().substr(0,10);

const menuButtons = [
    // {
    //     name: "HOME",
    //     path: "/"
    // },
    {
        name: 'DVLPMNTS',
        path: '/sprints',
    },
    {
        name: 'SPTLGHT',
        path: '/spotlight',
    },
    {
        name: 'TEAMS',
        path: '/teams',
    },
    {
        name: 'ADD',
        path: '/add_sprint',
    },
];

function NavBar(props) {
    return (
        <div className="container">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="logo">
                        <Link to={'/'} className="menu">
                            <i className="optin monster icon" href="/" /> BOON
                        </Link>
                    </Typography>
                    <div className="nav">
                        <div className="nav-left">
                            {menuButtons.map((button, index) => (
                                <Button key={index} color="inherit" href={button.path}>
                                    {button.name}
                                </Button>
                            ))}
                        </div>
                        <div className="nav-left">
                            <AuthButtons user={props.user} />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;
