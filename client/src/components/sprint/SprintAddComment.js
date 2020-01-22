import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui'; // Use the formik-ready variants of form fields.
import { Typography, Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import commentsService from '../../services/commentsService';

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

export const SprintAddComment = ({ _id, user, push }) => {
    const classes = useStyles();

    return (
        <Formik
            initialValues={{}}
            onSubmit={data => {
                const extendedData = {
                    ...data, // copy form values
                    sprintId: _id, // add sprint id
                };
                return commentsService.add(extendedData).then(() => {
                    push('/comments');
                });
            }}
        >
            {user ? (
                <Form className={classes.rootForm} noValidate autoComplete="off">
                    <Field
                        id="comment-body"
                        name="body"
                        multiline
                        rows="3"
                        placeholder={`Add Comment ${_id}`}
                        variant="outlined"
                        component={FormikTextField}
                    />
                    <p>
                        <button type="submit">Submit</button>
                    </p>
                </Form>
            ) : (
                <p>Log in to add a comment</p>
            )}
        </Formik>
    );
};
