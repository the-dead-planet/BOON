import React, { useState } from 'react';
// import { makeStyles, createStyles } from '@mui/styles';
import { Typography, Switch } from '@mui/material';
import * as Types from '../logic/types';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//     })
// );

// TODO: Add update user if user logged in and switches the dark mode on/off
interface Props {
    mode: Types.Mode;
    onModeChange: (mode: Types.Mode) => void;
}

const DarkModeSwitch = ({ mode, onModeChange }: Props) => {
    // const classes = useStyles();

    // Toggle mode light/dark
    const [state, setState] = useState({
        darkModeChecked: mode === 'dark',
    });

    const changeDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
        const darkModeChecked = event.target.checked;
        setState({ ...state, [event.target.name]: darkModeChecked });
        onModeChange(darkModeChecked ? 'dark' : 'light');
    };

    return (
        <Typography variant="subtitle2" noWrap>
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
