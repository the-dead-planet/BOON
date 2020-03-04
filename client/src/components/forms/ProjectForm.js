import React from 'react';
import TextField from '@material-ui/core/TextField';
import AppForm from './AppForm';
import GridField from './GridField';

const ProjectForm = ({ title, initialValues, onSubmit }) => {
    return (
        <AppForm title={title} initialValues={initialValues} onSubmit={onSubmit}>
            <GridField
                required
                fullWidth
                as={TextField}
                name="title"
                id="add-project-title"
                label="Project name"
                xs={12}
            />
            <GridField
                required
                fullWidth
                multiline
                rows={5}
                as={TextField}
                name="body"
                id="add-project-body"
                label="How's this project going to make the place a better world?"
                xs={12}
            />
        </AppForm>
    );
};

export default ProjectForm;
