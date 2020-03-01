import React from 'react';
import TextField from '@material-ui/core/TextField';
import AppForm from './AppForm';
import { Field } from 'formik';
import Grid from '@material-ui/core/Grid';

const SprintForm = ({ title, initialValues, onSubmit }) => {

    return (
        <AppForm title={title} initialValues={initialValues} onSubmit={onSubmit} >
            <Grid item xs={2}>
                <Field
                    required
                    fullWidth
                    as={TextField}
                    type="number"
                    name="number"
                    id="add-sprint-number"
                    label="Number"
                />
            </Grid>
            <Grid item xs={5}>
                <Field
                    required
                    fullWidth
                    as={TextField}
                    type="date"
                    name="dateFrom"
                    id="add-sprint-date-from"
                    label="Start date"
                />
            </Grid>
            <Grid item xs={5}>
                <Field
                    required
                    fullWidth
                    as={TextField}
                    type="date"
                    name="dateTo"
                    id="add-sprint-date-to"
                    label="End date"
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    required
                    fullWidth
                    as={TextField}
                    name="title"
                    id="add-sprint-title"
                    label="Sprint name"
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    required
                    fullWidth
                    multiline
                    rows={5}
                    as={TextField}
                    name="body"
                    id="add-sprint-body"
                    label="Did you start ruling the world this sprint?"
                />
            </Grid>
        </AppForm>
    );
};

export default SprintForm;
