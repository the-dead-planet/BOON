import React from 'react';
import { Field } from 'formik';
import { TextField, InputLabel, MenuItem, FormControl } from '@mui/material';
import Grid, { GridSize } from '@mui/material/Grid';
import { Input, Mode } from '../../logic/types';

interface FieldItem {
    _id: string;
    title: string;
}

interface Props {
    xs?: GridSize;
    sm?: GridSize;
    md?: GridSize;
    lg?: GridSize;
    xl?: GridSize;
    mode?: Mode;
    error?: string | undefined;
    touched?: boolean;
    name: string;
    id: string;
    label?: string;
    type?: Input;
    required?: boolean;
    as?: React.ElementType;
    items?: Array<FieldItem>;
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
    variant?: 'filled' | 'outlined';
    placeholder?: string;
}

// TODO: Correct display of active grid field in vintage dark mode and frostic light

export const GridField = ({ xs, sm, md, lg, xl, error, touched, ...fieldProps }: Props) => {
    // const classes = useStyles();

    return (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
            <Field
                as={TextField}
                fullWidth
                margin="dense"
                error={touched && error !== undefined}
                helperText={touched && error ? error : undefined}
                {...fieldProps}
            />
        </Grid>
    );
};

export const GridFieldSelect = ({ id, label, items, xs, sm, md, lg, xl, ...fieldProps }: Props) => {
    // const classes = useStyles();
    const labelId = `${id}-label`;

    const menuItems =
        items &&
        items.map((item: FieldItem) => (
            <MenuItem key={item._id} value={item._id}>
                {item.title}
            </MenuItem>
        ));

    return (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
            <FormControl fullWidth>
                <InputLabel id={labelId}>{label}</InputLabel>
                <Field id={id} labelId={labelId} {...fieldProps}>
                    {menuItems}
                </Field>
            </FormControl>
        </Grid>
    );
};
