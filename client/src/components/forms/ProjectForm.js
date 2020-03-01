import React from 'react';
import TextField from '@material-ui/core/TextField';
import AppForm from './AppForm';

const ProjectForm = ({ title, initialValues, onSubmit }) => {
    const fields = [
        {
            grid: {
                xs: 12,
                md: 12,
                lg: 12,
            },
            component: TextField,
            type: 'text',
            rows: null,
            name: 'title',
            id: 'add-project-title',
            label: 'Project name',
        },
        {
            grid: {
                xs: 12,
                md: 12,
                lg: 12,
            },
            component: TextField,
            type: 'text',
            rows: '5',
            name: 'body',
            id: 'add-project-body',
            label: "How's this project going to make the place a better world?",
        },
    ];

    return <AppForm title={title} initialValues={initialValues} onSubmit={onSubmit} fields={fields} />;
};

export default ProjectForm;
