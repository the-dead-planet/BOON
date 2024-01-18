import React from 'react';
import { FormikHelpers, FormikValues } from 'formik';
import { makeStyles, createStyles } from '@mui/styles';
import { TextField, Button, Theme } from '@mui/material';
import { AppFormLayout, AppForm } from './App';
import { GridField } from './GridFields';
import { ProjectSubmit } from '../../logic/types';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        submitButton: {
            marginTop: '35px',
            width: '100%',
        },
    })
);

interface Props {
    title: string;
    initialValues: ProjectSubmit;
    onSubmit: (values: { [field: string]: unknown; }, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<unknown>;
}

const ProjectForm: React.FC<Props> = ({ title, initialValues, onSubmit }) => {
    const classes = useStyles();
    const ui = Hooks.useSubject(AppState.ui$);

    return (
        <AppFormLayout title={title ? title : 'Add project'}>
            <AppForm
                initialValues={initialValues as unknown as { [field: string]: unknown; }}
                onSubmit={onSubmit}
                // validationSchema={validationSchema}
                submitSection={
                    <Button
                        variant={ui.mode === 'dark' ? 'outlined' : 'contained'}
                        color={ui.mode === 'dark' ? undefined : 'primary'}
                        type="submit"
                        className={classes.submitButton}
                    >
                        Submit
                    </Button>
                }
            >
                <>
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
                </>
            </AppForm>
        </AppFormLayout>
    );
};

export default ProjectForm;
