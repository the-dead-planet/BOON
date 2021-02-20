import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { Grid, Paper, Typography, Hidden } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { withValidationList } from '../../utils/withValidation';
import image from '../../img/content/vintage/watch.jpg';
import { Mode } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formPaper: {
            color: theme.palette.text.primary,
            width: '100%',
            maxWidth: '70em',
            margin: '0 auto',
            overflow: 'hidden',
        },
        img: {
            display: 'block',
            // height: "auto",
            width: '100%',
            objectFit: 'cover',
            margin: '0 auto',
        },
        content: {
            padding: '6em',
            [theme.breakpoints.down('sm')]: {
                padding: '2em',
            },
        },
        error: {
            margin: '1em 0',
        },
    })
);

interface GridFormProps {
    children: React.ReactChild | Array<React.ReactChild | undefined> | undefined;
    title?: string;
}

// Centered form wrapped in a grid on paper
export const AppFormLayout = ({ children, title }: GridFormProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.formPaper}>
            <Grid container direction="row">
                <Hidden smDown>
                    <Grid item xs={6}>
                        <img className={classes.img} src={image} />
                    </Grid>
                </Hidden>

                <Grid container direction="column" justify="center" item xs={12} md={6} className={classes.content}>
                    {title && (
                        <Grid item>
                            <Typography color="textPrimary" align="center" variant="h4" gutterBottom>
                                {title}
                            </Typography>
                        </Grid>
                    )}

                    {children}
                </Grid>
            </Grid>
        </Paper>
    );
};

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
    submitPos?: 'bottom' | 'right';
    error?: string;
    content?: any;
}

/* 
    Raw form to use in components with paper.
    Provide either validate or validationSchema
*/
// TODO: handle providing both validate and validationSchema / provide validate as a function
export const AppForm = ({
    mode,
    initialValues,
    onSubmit,
    validationSchema,
    submitSection,
    submitPos = 'bottom',
    children,
    error,
    content,
}: Props) => {
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
                        <Grid container justify="center">
                            {content}

                            {error && (
                                <Grid item xs={12} className={classes.error}>
                                    <Alert variant="filled" severity="error">
                                        {error}
                                    </Alert>
                                </Grid>
                            )}

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
