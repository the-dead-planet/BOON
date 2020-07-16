import React from 'react';
import TextField from '@material-ui/core/TextField';
import { AppFormPaper } from './App';
import { GridField } from './GridFields';
import { ProjectSubmit } from '../../logic/types';

interface Props {
    title: string;
    initialValues: ProjectSubmit;
    onSubmit: any;
}

const ProjectForm = ({ title, initialValues, onSubmit }: Props) => {
    return (
        <AppFormPaper title={title} initialValues={initialValues} onSubmit={onSubmit}>
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
        </AppFormPaper>
    );
};

export default ProjectForm;
