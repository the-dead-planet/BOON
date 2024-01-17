import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { TextField, Button, Theme } from '@mui/material';
import { AppFormLayout, AppForm } from './App';
import { GridField } from './GridFields';
import { SprintSubmit } from '../../logic/types';
import { FormikHelpers, FormikValues } from 'formik';
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
    initialValues: SprintSubmit;
    onSubmit: (values: { [field: string]: unknown; }, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<unknown>;
}

const SprintForm: React.FC<Props> = ({ title, initialValues, onSubmit }) => {
    const classes = useStyles();
    const ui = Hooks.useSubject(AppState.ui$);

    return (
        <AppFormLayout title={title ? title : 'Add sprint'}>
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
                        type="number"
                        name="number"
                        id="add-sprint-number"
                        label="Number"
                        xs={2}
                    />
                    <GridField
                        required
                        fullWidth
                        as={TextField}
                        type="date"
                        name="dateFrom"
                        id="add-sprint-date-from"
                        label="Start date"
                        xs={5}
                    />
                    <GridField
                        required
                        fullWidth
                        as={TextField}
                        type="date"
                        name="dateTo"
                        id="add-sprint-date-to"
                        label="End date"
                        xs={5}
                    />
                    <GridField
                        required
                        fullWidth
                        as={TextField}
                        name="title"
                        id="add-sprint-title"
                        label="Sprint name"
                        xs={12}
                    />
                    <GridField
                        required
                        fullWidth
                        multiline
                        rows={5}
                        as={TextField}
                        name="body"
                        id="add-sprint-body"
                        label="Did you start ruling the world this sprint?"
                        xs={12}
                    />
                </>
            </AppForm>
        </AppFormLayout>
    );
};

export default SprintForm;
