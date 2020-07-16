import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'formik';
import { Grid, GridSize, InputLabel, MenuItem, FormControl, TextField } from '@material-ui/core';
import { Input, Mode } from '../../logic/types';

interface FieldItem {
    _id: string,
    title: string
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
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
    name: string;
    placeholder?: string;
    id: string;
    label?: string;
    type?: Input;
    required?: boolean;
    as?: React.ElementType;
    items?: Array<FieldItem>;
    variant?: "outlined" | "filled";
}

const DarkTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'rgba(255, 255, 255, 0.87)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgba(255, 255, 255, 0.87)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.87)',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.87)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.87)',
            },
        },
    },
})(TextField);


export const GridField = ({ xs, sm, md, lg, xl, error, touched, mode, ...fieldProps }: Props) => {
  
    return (
      <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        <Field
          as={mode === "dark" ? DarkTextField : TextField}
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
    const labelId = `${id}-label`;
  
    const menuItems = items &&
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