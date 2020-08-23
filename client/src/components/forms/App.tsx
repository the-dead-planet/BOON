import React, { useState } from 'react';
import { useStyles } from '../../styles/main';
import { Formik, Form } from 'formik';
import { Grid, Paper, Typography, Hidden } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { withValidationList } from '../../utils/withValidation';
import image from '../../img/forms/Register.png';
import { Mode } from '../../logic/types';

// const EmailValidator = _;
// TODO: add a mechanism from router to make sure user wants to close the window if the forms are partially filled but not submitted
interface Props {
    mode: Mode;
    initialValues: object;
    onSubmit?: any;
    validate?: any;
    validationSchema?: any;
    children: any;
    submitSection: any;
}

/* 
    Raw form to use in components with paper.
    Provide either validate or validationSchema
*/
// TODO: handle providing both validate and validationSchema / provide validate as a function
export const AppForm = ({ mode, initialValues, onSubmit, validationSchema, submitSection, children }: Props) => {
    const classes = useStyles();

    // Disable submit button if errors appear, enable if all input values meet validation criteria
    const [submitDisabled, setDisabled] = useState(false);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            // validate={validate}
            validationSchema={validationSchema}
        >
            {({ errors, touched }) => {
                return (
                    <Form>
                        <Grid item>
                            {/* 
                            [].flat applied as 'children' might be an array of components (Login, Register) or a single component (Logout) 
                            Extra check if child is not undefined as the Login form includes 'undefined' in place of other fields from "Register" page.
                            TODO: Consider changing this behavior in the auth form for "login"
                        */}
                            {withValidationList(children, errors, touched)}

                            {/* This prop should receive at least a button with type submit */}
                            {submitSection}
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

interface GridFormProps {
    children: React.ReactChild | Array<React.ReactChild | undefined> | undefined;
    title?: string;
    error?: string;
}

// Centered form wrapped in a grid on paper
export const AppFormLayout = ({ children, title, error }: GridFormProps) => {
    const classes = useStyles();
    const style = { margin: '1em auto' };

    return (
        <Paper className={classes.formPaper}>
            <Grid container direction="row" spacing={2}>
                <Hidden smDown>
                    <Grid item md={6}>
                        <img className={classes.image} src={image} />
                    </Grid>
                </Hidden>

                <Grid container direction="column" justify="space-evenly" item xs={12} md={6}>
                    {title && (
                        <Grid item>
                            <Typography align="center" variant="h4" gutterBottom>
                                {title}
                            </Typography>
                        </Grid>
                    )}

                    {error && (
                        <Grid item>
                            <Alert style={style} variant="filled" severity="error">
                                {error}
                            </Alert>
                        </Grid>
                    )}

                    {children}
                </Grid>
            </Grid>
        </Paper>
    );
};
