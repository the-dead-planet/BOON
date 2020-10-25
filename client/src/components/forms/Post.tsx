import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField, Select, Button } from '@material-ui/core';
import { AppFormLayout, AppForm } from './App';
import { GridField, GridFieldSelect } from './GridFields';
import projectsService from '../../services/projectsService';
import { Mode, PostSubmit } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        submitButton: {
            marginTop: '35px',
            width: '100%',
        },
    })
);

interface Props {
    mode: Mode;
    title: string;
    initialValues: PostSubmit;
    onSubmit: any;
}

const PostForm = ({ mode, title, initialValues, onSubmit }: Props) => {
    const classes = useStyles();

    const [projects, setProjects] = useState([]);

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
        <AppFormLayout title={title ? title : 'Add project'}>
            <AppForm
                mode={mode}
                initialValues={initialValues}
                onSubmit={onSubmit}
                // validationSchema={validationSchema}
                submitSection={
                    <Button
                        variant={mode === 'dark' ? 'outlined' : 'contained'}
                        color={mode === 'dark' ? undefined : 'primary'}
                        type="submit"
                        className={classes.submitButton}
                    >
                        Submit
                    </Button>
                }
            >
                <GridFieldSelect
                    required
                    fullWidth
                    as={Select}
                    name="project"
                    id="add-post-project"
                    label="Project"
                    items={projects}
                    xs={12}
                />
                <GridField
                    required
                    fullWidth
                    as={TextField}
                    name="title"
                    id="add-post-title"
                    label="Post Name"
                    xs={12}
                />
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
        </AppFormLayout>
    );
};

export default PostForm;
