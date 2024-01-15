import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { List, ListItem, Theme, Typography } from '@mui/material';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { MODES, THEME_TYPES } from '../../constants/data';
import * as Hooks from '../../hooks';
import * as Types from '../../logic/types';
import * as AppState from '../../app-state';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        preferences: {
            width: '100%',
            padding: '1em',
        },
        itemName: {
            minWidth: '5em',
            width: '40%',
        },
        radioGroup: {
            [theme.breakpoints.up('md')]: {
                display: 'inline',
            },
        },
    })
);

export const Preferences: React.FC = () => {
    const classes = useStyles();
    const ui = Hooks.useSubject(AppState.ui$);

    const handleThemeChange = React.useCallback((theme: string) => {
        AppState.ui$.next({ ...AppState.ui$.value, theme: theme as Types.ThemeType })
    }, []);

    const handleModeChange = React.useCallback((mode: string) => {
        AppState.ui$.next({ ...AppState.ui$.value, mode: mode as Types.Mode })
    }, []);

    return (
        <List className={classes.preferences}>
            <ListItem>
                <Typography className={classes.itemName}>Theme</Typography>
                <RadioButtonGroup
                    valueList={THEME_TYPES as string[]}
                    value={ui.theme as string}
                    setValue={handleThemeChange}
                />
            </ListItem>

            <ListItem>
                <Typography className={classes.itemName}>Mode</Typography>
                <RadioButtonGroup valueList={MODES as string[]} value={ui.mode as string} setValue={handleModeChange} />
            </ListItem>
        </List>
    );
};
