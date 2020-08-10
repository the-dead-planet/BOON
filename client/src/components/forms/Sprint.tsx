import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { AppFormLayout, AppForm } from './App';
import { GridField } from './GridFields';
import { Mode, SprintSubmit } from '../../logic/types';

interface Props {
    mode: Mode;
    title: string;
    initialValues: SprintSubmit;
    onSubmit: any;
}

const SprintForm = ({ mode, title, initialValues, onSubmit }: Props) => {
    return (
        <AppFormLayout title={title ? title : 'Add sprint'}>
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
            </AppForm>
        </AppFormLayout>
    );
};

export default SprintForm;
