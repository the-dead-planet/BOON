import React from 'react';
import TextField from '@material-ui/core/TextField';
import AppForm from './AppForm';
import { Field } from 'formik';
import Grid from '@material-ui/core/Grid';

const ProjectForm = ({ title, initialValues, onSubmit }) => {

    return (
        <AppForm title={title} initialValues={initialValues} onSubmit={onSubmit} >
            <Grid item xs={12}>
                <Field
                    required
                    fullWidth
                    as={TextField}
                    name="title"
                    id="add-project-title"
                    label="Project name"
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
                    id="add-project-body"
                    label="How's this project going to make the place a better world?"
                />
            </Grid>
        </AppForm>
    );
};

export default ProjectForm;
