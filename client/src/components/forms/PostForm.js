import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import projectsService from '../../services/projectsService';
import AppForm from './AppForm';
import SelectComponent from './SelectComponent';
import { Field } from 'formik';
import Grid from '@material-ui/core/Grid';

const PostForm = ({ title, initialValues, onSubmit }) => {
    const [projects, setProjects] = useState(null);

    const getProjects = async () => {
        let res = await projectsService.getAll();
        setProjects(res);
    };

    useEffect(() => {
        if (!projects) {
            getProjects();
        }
    });

    return (
        <AppForm title={title} initialValues={initialValues} onSubmit={onSubmit} >
            <Grid item xs={12}>
                <Field
                    required
                    fullWidth
                    as={SelectComponent}
                    name="project"
                    id="add-post-project"
                    label="Project"
                    items={projects}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    required
                    fullWidth
                    as={TextField}
                    name="title"
                    id="add-post-title"
                    label="Post Name"
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
                    id="add-post-body"
                    label="How's this increment going to make the place a better world?"
                />
            </Grid>
        </AppForm>
    );
};

export default PostForm;
