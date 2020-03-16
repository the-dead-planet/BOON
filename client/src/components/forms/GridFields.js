import React from 'react';
import { useStyles } from '../../styles/main';
import { Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

export const GridField = props => {
    const classes = useStyles();
    const { xs, sm, md, lg, xl, ...fieldProps } = props;

    return (
        <Grid className={classes.flexCenter} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
            <Field {...fieldProps} />
        </Grid>
    );
};

export const GridFieldSelect = props => {
    const classes = useStyles();
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
        <Grid className={classes.flexCenter} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
            <FormControl fullWidth>
                <InputLabel id={labelId}>{label}</InputLabel>
                <Field id={id} labelId={labelId} {...fieldProps}>
                    {menuItems}
                </Field>
            </FormControl>
        </Grid>
    );
};
