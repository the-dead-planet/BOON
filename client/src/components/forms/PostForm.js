import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import projectsService from '../../services/projectsService';
import AppForm from './AppForm';
import SelectComponent from './SelectComponent';
import GridField from './GridField';

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

    return (
        <AppForm title={title} initialValues={initialValues} onSubmit={onSubmit}>
            <GridField
                required
                fullWidth
                as={SelectComponent}
                name="project"
                id="add-post-project"
                label="Project"
                items={projects}
                xs={12}
            />
            <GridField required fullWidth as={TextField} name="title" id="add-post-title" label="Post Name" xs={12} />
            <GridField
                required
                fullWidth
                multiline
                rows={5}
                as={TextField}
                name="body"
                id="add-post-body"
                label="How's this increment going to make the place a better world?"
                xs={12}
            />
        </AppForm>
    );
};

export default PostForm;
