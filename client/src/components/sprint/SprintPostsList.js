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

export const SprintPostsList = ({ posts }) => {
    const classes = useStyles();

    return (
        <List>
            <h2>Posts</h2>
            {(posts || []).map((post, index) => (
                <div key={index}>
                    <h4>{post.title}</h4>
                    <p>
                        {post.author.username} / {post.created.substring(0, 10)}
                    </p>
                    <p>{post.body}</p>
                </div>
            ))}
        </List>
    );
};
