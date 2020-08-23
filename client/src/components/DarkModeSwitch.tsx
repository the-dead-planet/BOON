import React, { useState } from 'react';
import { useStyles } from '../styles/main';
import { Typography, Switch } from '@material-ui/core';
import { Mode } from '../logic/types';

// TODO: Add update user if user logged in and switches the dark mode on/off
interface Props {
    mode: Mode;
    setMode: any;
    style?: object;
}

const DarkModeSwitch = ({ mode, setMode, style }: Props) => {
    const classes = useStyles();

    // Toggle mode light/dark
    const [state, setState] = useState({
        darkModeChecked: mode === 'dark',
    });

    const changeDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
        const darkModeChecked = event.target.checked;
        setState({ ...state, [event.target.name]: darkModeChecked });
        setMode(darkModeChecked ? 'dark' : 'light');
    };

    return (
        <Typography style={style} variant="subtitle2" noWrap>
            Dark Mode
            <Switch
                checked={state.darkModeChecked}
                onChange={changeDarkMode}
                name="darkModeChecked"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </Typography>
    );
};

export default DarkModeSwitch;
