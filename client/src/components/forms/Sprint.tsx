import React from 'react';
import * as Yup from 'yup';
import { AppFormLayout, AppForm } from './App';
import { GridField } from './GridFields';
import { TextField } from '@material-ui/core';
import { Mode, SprintSubmit } from '../../logic/types';

interface Props {
    mode: Mode;
    title: string;
    initialValues: SprintSubmit;
    onSubmit: any;
}

const SprintForm = ({ mode, title, initialValues, onSubmit }: Props) => {
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
        <AppFormLayout title={title ? title : 'Add sprint'}>
            <AppForm mode={mode} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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
