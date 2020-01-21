import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui'; // Use the formik-ready variants of form fields.
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SprintCommentsList } from './SprintCommentsList';
import { SprintAddComment } from './SprintAddComment';
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

export const SprintDetailsComments = ({ user, _id, comments, push }) => {
    const classes = useStyles();

    return (
        <Box id={'comments'}>
            <SprintCommentsList user={user} comments={comments} />
            <SprintAddComment user={user} _id={_id} push={push} />
        </Box>
    );
};
