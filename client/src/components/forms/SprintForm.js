import React from 'react';
import TextField from '@material-ui/core/TextField';
import AppForm from './AppForm';

const SprintForm = ({ title, initialValues, onSubmit }) => {
    const fields = [
        {
            grid: {
                xs: 2,
                md: 2,
                lg: 2,
            },
            component: TextField,
            type: 'number',
            name: 'number',
            id: 'add-sprint-number',
            label: 'Number',
        },
        {
            grid: {
                xs: 5,
                md: 5,
                lg: 5,
            },
            component: TextField,
            type: 'date',
            name: 'dateFrom',
            id: 'add-sprint-date-from',
            label: 'Start date',
        },
        {
            grid: {
                xs: 5,
                md: 5,
                lg: 5,
            },
            component: TextField,
            type: 'date',
            name: 'dateTo',
            id: 'add-sprint-date-to',
            label: 'End date',
        },
        {
            grid: {
                xs: 12,
                md: 12,
                lg: 12,
            },
            component: TextField,
            type: 'text',
            name: 'title',
            id: 'add-sprint-title',
            label: 'Sprint title',
        },
        {
            grid: {
                xs: 12,
                md: 12,
                lg: 12,
            },
            component: TextField,
            type: 'text',
            rows: 5,
            name: 'body',
            id: 'add-sprint-body',
            label: 'Did you start ruling the world this sprint?',
        },
    ];

    return <AppForm title={title} initialValues={initialValues} onSubmit={onSubmit} fields={fields} />;
};

export default SprintForm;
