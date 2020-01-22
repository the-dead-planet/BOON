import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui'; // Use the formik-ready variants of form fields.
import { Typography, Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import commentsService from '../../services/commentsService';

const useStyles = makeStyles(theme => ({}));

export const SprintCommentsList = ({ comments }) => {
    const classes = useStyles();

    return (
        <List>
            <h3>Comments</h3>
            {(comments || []).map((comment, index) => (
                <div key={index}>
                    <h4>
                        {comment.author.username} / {comment.created.substring(0, 10)}
                    </h4>
                    <p>{comment.body}</p>
                </div>
            ))}
        </List>
    );
};
