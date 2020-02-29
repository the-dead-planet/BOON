import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import projectsService from '../../services/projectsService';
import AppForm from './AppForm';

const PostForm = ({ title, initialValues, onSubmit }) => {
    const [projects, setProjects] = useState(null);

    const getProjects = async () => {
        let res = await projectsService.getAll();
        setProjects(res);
    };

    useEffect(() => {
        if (!projects) {
            getProjects();
        }
    });

    const fields = [
        {
            grid: {
                xs: 12,
                md: 12,
                lg: 12,
            },
            component: FormControl,
            type: 'text',
            rows: null,
            name: 'project',
            id: 'add-post-project',
            label: 'Project',
            select: {
                list: projects,
            },
        },
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
            id: 'add-post-title',
            label: 'Post name',
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
            id: 'add-post-body',
            label: "How's this increment going to make the place a better world?",
        },
    ];

    return <AppForm title={title} initialValues={initialValues} onSubmit={onSubmit} fields={fields} />;
};

export default PostForm;
