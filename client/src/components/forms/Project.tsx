import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { AppFormLayout, AppForm } from './App';
import { GridField } from './GridFields';
import { ProjectSubmit, Mode } from '../../logic/types';

interface Props {
    mode: Mode;
    title: string;
    initialValues: ProjectSubmit;
    onSubmit: any;
}

const ProjectForm = ({ mode, title, initialValues, onSubmit }: Props) => {
    return (
        <AppFormLayout title={title ? title : 'Add project'}>
            <AppForm
                mode={mode}
                initialValues={initialValues}
                onSubmit={onSubmit}
                // validationSchema={validationSchema}
                submitSection={
                    <Button
                        style={{ marginTop: '35px', width: '100%' }}
                        variant={mode === 'dark' ? 'outlined' : 'contained'}
                        color={mode === 'dark' ? undefined : 'primary'}
                        type="submit"
                    >
                        Submit
                    </Button>
                }
            >
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
        </AppFormLayout>
    );
};

export default ProjectForm;
