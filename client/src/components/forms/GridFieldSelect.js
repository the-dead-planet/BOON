import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Field } from 'formik';
import Grid from '@material-ui/core/Grid';

// TODO: think if it's possible to merge this component nicely with GridField
const GridFieldSelect = props => {
    const { id, label, items, xs, sm, md, lg, xl, ...fieldProps } = props;
    const labelId = `${id}-label`;

    const menuItems = items
        ? items.map(item => (
              <MenuItem key={item._id} value={item._id}>
                  {item.title}
              </MenuItem>
          ))
        : null;

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

export default GridFieldSelect;
