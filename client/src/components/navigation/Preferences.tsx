import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography } from '@material-ui/core';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { ThemeType, Mode } from '../../logic/types';
import { MODES, THEME_TYPES } from '../../constants/data';

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

interface Props {
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
}

export const Preferences = ({ themeType, setThemeType, mode, setMode }: Props) => {
    const classes = useStyles();

    return (
        <List className={classes.preferences}>
            {/* Theme type selection */}
            <ListItem>
                <Typography className={classes.itemName}>Theme</Typography>
                <RadioButtonGroup
                    valueList={THEME_TYPES as Array<string>}
                    value={themeType as string}
                    setValue={setThemeType}
                />
            </ListItem>

            {/* Light / Dark mode selection */}
            <ListItem>
                <Typography className={classes.itemName}>Mode</Typography>
                <RadioButtonGroup valueList={MODES as Array<string>} value={mode as string} setValue={setMode} />
            </ListItem>
        </List>
    );
};
