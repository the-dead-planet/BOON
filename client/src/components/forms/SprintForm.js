import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const SprintForm = ({ title, initialValues, onSubmit }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            height: '100%',
            flexGrow: 1,
            flexWrap: 'wrap',
            display: 'flex',
            // alignContent: 'center',
            justifyContent: 'center',
            margin: '3% auto',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            width: '500px', //TODO: correct it
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
    }));

    const classes = useStyles();

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {() => (
                <div className={classes.root}>
                    <Form>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <h1>{title}</h1>
                                </Grid>

                                <Grid item xs={2}>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        type="number"
                                        name="number"
                                        required
                                        id="add-sprint-number"
                                        label="Number"
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        type="date"
                                        name="dateFrom"
                                        required
                                        id="add-sprint-date-from"
                                        label="Start date"
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        type="date"
                                        name="dateTo"
                                        required
                                        id="add-sprint-date-to"
                                        label="End date"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        name="title"
                                        required
                                        id="add-sprint-title"
                                        label="Sprint title"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        multiline
                                        rows="5"
                                        as={TextField}
                                        name="body"
                                        required
                                        id="add-sprint-body"
                                        label="Did you start ruling the world this sprint?"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button type="submit">Submit</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default SprintForm;
