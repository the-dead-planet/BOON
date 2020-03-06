import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const AppForm = ({ title, initialValues, onSubmit, children }) => {
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
            color: theme.palette.text.secondary,
            width: '500px', //TODO: correct it
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        center: {
            textAlign: 'center',
        },
    }));

    const classes = useStyles();

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h1 className={classes.center}>{title}</h1>
                            </Grid>

                            {children}

                            <Grid className={classes.center} item xs={12}>
                                <Button type="submit">Submit</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </Form>
        </Formik>
    );
};

export default AppForm;
