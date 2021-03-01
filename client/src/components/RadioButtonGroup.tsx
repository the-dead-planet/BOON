import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        radioGroup: {
            [theme.breakpoints.up('md')]: {
                display: 'inline',
            },
        },
    })
);

interface Props {
    valueList: Array<string>;
    value: string;
    setValue: any;
}

export const RadioButtonGroup = ({ valueList, value, setValue }: Props) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value;
        setValue(val);
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup
                aria-label="mode"
                name="mode"
                value={value}
                onChange={handleChange}
                className={classes.radioGroup}
            >
                {valueList.map((val, i) => (
                    <FormControlLabel key={i} value={val} control={<Radio />} label={val} />
                ))}
            </RadioGroup>
        </FormControl>
    );
};
