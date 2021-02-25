import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
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

    const [themeTypeValue, setThemeTypeValue] = React.useState(themeType);
    const [modeValue, setModeValue] = React.useState(mode);

    const handleThemeTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val: ThemeType = (event.target as HTMLInputElement).value as ThemeType;
        setThemeTypeValue(val);
        setThemeType(val);
    };
    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value as Mode;
        setModeValue(val);
        setMode(val);
    };

    return (
        <List className={classes.preferences}>
            {/* Theme type selection */}
            <ListItem>
                <Typography className={classes.itemName}>Theme</Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="mode"
                        name="mode"
                        value={themeTypeValue}
                        onChange={handleThemeTypeChange}
                        className={classes.radioGroup}
                    >
                        {THEME_TYPES.map((t: ThemeType) => (
                            <FormControlLabel value={t} control={<Radio />} label={t} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </ListItem>

            {/* Light / Dark mode selection */}
            <ListItem>
                <Typography className={classes.itemName}>Mode</Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="mode"
                        name="mode"
                        value={modeValue}
                        onChange={handleModeChange}
                        className={classes.radioGroup}
                    >
                        {MODES.map((m: Mode) => (
                            <FormControlLabel value={m} control={<Radio />} label={m} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </ListItem>
        </List>
    );
};
