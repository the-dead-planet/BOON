import React from 'react';
import { Field } from 'formik';
import Grid from '@material-ui/core/Grid';

const GridField = props => {
    const { xs, sm, md, lg, xl, ...fieldProps } = props;

    return (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
            <Field {...fieldProps} />
        </Grid>
    );
};

export default GridField;
