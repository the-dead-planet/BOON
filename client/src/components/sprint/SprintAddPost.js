import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui'; // Use the formik-ready variants of form fields.
import { Typography, Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import postsService from '../../services/postsService';

const useStyles = makeStyles(theme => ({
    rootForm: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '100%',
            margin: '0 auto',
        },
    },
    root: {
        padding: theme.spacing(3, 2),
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    offset: {
        padding: '20px',
    },
}));

export const SprintAddPost = ({ _id, user, push }) => {
    const classes = useStyles();

    return (
        <Formik
            initialValues={{}}
            onSubmit={data => {
                const extendedData = {
                    ...data, // copy form values
                    sprintId: _id, // add sprint id
                };
                return postsService.add(extendedData).then(() => {
                    push('/posts');
                });
            }}
        >
            {user ? (
                <Form className={classes.rootForm} noValidate autoComplete="off">
                    <Field
                        name="post"
                        multiline
                        rows="3"
                        placeholder={`Add Post to sprint: ${_id}`}
                        variant="outlined"
                        component={FormikTextField}
                    />
                    <p>
                        <button type="submit">Submit</button>
                    </p>
                </Form>
            ) : (
                <p>Log in to add a post</p>
            )}
        </Formik>
    );
};
