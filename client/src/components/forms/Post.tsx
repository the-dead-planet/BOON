import React from 'react';
import { FormikHelpers, FormikValues } from 'formik';
import { makeStyles, createStyles } from '@mui/styles';
import { TextField, Select, Button, Theme } from '@mui/material';
import { AppFormLayout, AppForm } from './App';
import { GridField, GridFieldSelect } from './GridFields';
import { Project, PostSubmit } from '../../logic/types';
import { useServices } from '../../services';
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
    initialValues: PostSubmit;
    onSubmit: (values: { [field: string]: unknown; }, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<unknown>;
}

const PostForm: React.FC<Props> = ({ title, initialValues, onSubmit }) => {
    const classes = useStyles();
    const ui = Hooks.useSubject(AppState.ui$);
    const [projects, setProjects] = React.useState<Array<Project>>([]);
    const { projectsService } = useServices()!;

    React.useEffect(() => {
        if (projects) {
            return;
        }
        projectsService.getAll()
            .then(setProjects)
            .catch((err) => {
                AppState.notificationHandler.addNotification(err.message ?? 'Could not get projects');
            });
    }, []);

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
                </>
            </AppForm>
        </AppFormLayout>
    );
};

export default PostForm;
