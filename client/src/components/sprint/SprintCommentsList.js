import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui'; // Use the formik-ready variants of form fields.
import { Typography, Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import commentsService from '../../services/commentsService';
import { authenticatedPage } from '../../components/authenticatedPage';
import { withPush } from '../../utils/routingDecorators';

const useStyles = makeStyles(theme => ({}));

export const SprintCommentsList = ({ user, comments, push }) => {
    const classes = useStyles();

    return (
        <List>
            {(comments || []).map((comment, index) => (
                <div key={index}>
                    <h4>
                        {comment.author.username} / {comment.created.substring(0, 10)}
                    </h4>
                    <p>{comment.body}</p>

                    {user && comment.author.id === user._id ? (
                        <Formik
                            initialValues={{}}
                            onSubmit={data => {
                                const extendedData = {
                                    commentId: comment._id, // add sprint id
                                };
                                return commentsService.delete(extendedData).then(() => {
                                    push('/comments');
                                });
                            }}
                        >
                            <Form className={classes.rootForm}>
                                <button type="submit">Delete</button>
                            </Form>
                        </Formik>
                    ) : (
                        ''
                    )}
                </div>
            ))}
        </List>
    );
};
