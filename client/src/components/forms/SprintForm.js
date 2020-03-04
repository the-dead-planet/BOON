import React from 'react';
import TextField from '@material-ui/core/TextField';
import AppForm from './AppForm';
import GridField from './GridField';

const SprintForm = ({ title, initialValues, onSubmit }) => {
    return (
        <AppForm title={title} initialValues={initialValues} onSubmit={onSubmit}>
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
    );
};

export default SprintForm;
