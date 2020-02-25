import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const AuthForm = ({ type, onSubmit }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            height: '100%',
            flexGrow: 1,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            margin: '3% auto',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
    }));

    const classes = useStyles();

    var usernameField,
        teamField = null;
    var title = 'Login';

    if (type === 'register') {
        usernameField = (
            <Grid item xs={12}>
                <Field as={TextField} name="username" required id="auth-username" label="Username" />
            </Grid>
        );

        // TODO: Change to select
        teamField = (
            <Grid item xs={12}>
                <Field as={TextField} name="team" required id="auth-team" label="Team" />
            </Grid>
        );

        title = 'Register';
    }

    return (
        <Formik initialValues={{ username: '', password: '', email: '', team: '' }} onSubmit={onSubmit}>
            {() => (
                <div className={classes.root}>
                    <Form>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <h1>{title}</h1>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField} name="email" required id="auth-email" label="E-mail" />
                                </Grid>

                                {usernameField}

                                <Grid item xs={12}>
                                    <Field
                                        type="password"
                                        as={TextField}
                                        name="password"
                                        required
                                        id="auth-password"
                                        label="Password"
                                    />
                                </Grid>

                                {teamField}

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

export default AuthForm;
