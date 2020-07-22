import React from 'react';
import * as Yup from 'yup';
import { AppFormLayout, AppForm } from './App';
import { GridField } from './GridFields';
import { TextField } from '@material-ui/core';
import { ProjectSubmit, Mode } from '../../logic/types';

interface Props {
    mode: Mode;
    title: string;
    initialValues: ProjectSubmit;
    onSubmit: any;
}

const ProjectForm = ({ mode, title, initialValues, onSubmit }: Props) => {
    // TODO: Write validation schema
    const validationSchema = (values: any) => undefined;
    // Yup.object().shape({
    //     email: Yup.string()
    //         .email()
    //         .required('Required'),
    //     password: Yup.string()
    //         .required('No password provided.')
    //         .min(8, 'Password is too short - should be 8 chars minimum.')
    //         .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
    // });

    return (
        <AppFormLayout title={title ? title : 'Add project'}>
            <AppForm mode={mode} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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
