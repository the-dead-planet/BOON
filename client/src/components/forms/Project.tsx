import { makeStyles, createStyles } from '@mui/styles';
import { TextField, Button, Theme } from '@mui/material';
import { AppFormLayout, AppForm } from './App';
import { GridField } from './GridFields';
import { ProjectSubmit, Mode } from '../../logic/types';
import { FormikHelpers, FormikValues } from 'formik';

const useStyles = makeStyles((_theme: Theme) =>
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
    initialValues: ProjectSubmit;
    onSubmit: (values: { [field: string]: unknown; }, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<unknown>;
}

const ProjectForm = ({ mode, title, initialValues, onSubmit }: Props) => {
    const classes = useStyles();

    return (
        <AppFormLayout title={title ? title : 'Add project'}>
            <AppForm
                mode={mode}
                initialValues={initialValues as unknown as { [field: string]: unknown; }}
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
                <>
                    <GridField
                        required
                        fullWidth
                        as={TextField}
                        name="title"
                        id="add-project-title"
                        label="Project name"
                        xs={12}
                    />
                    <GridField
                        required
                        fullWidth
                        multiline
                        rows={5}
                        as={TextField}
                        name="body"
                        id="add-project-body"
                        label="How's this project going to make the place a better world?"
                        xs={12}
                    />
                </>
            </AppForm>
        </AppFormLayout>
    );
};

export default ProjectForm;
