import React from 'react';
import { Formik, Form } from 'formik';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import commentsService from '../../services/commentsService';
// import { authenticatedPage } from '../../components/authenticatedPage';

const useStyles = makeStyles(theme => ({}));

export const SprintCommentsList = ({ user, sprintId, comments, push }) => {
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
                                    ...data,
                                    commentId: comment._id, // add sprint id
                                    sprintId: sprintId,
                                };
                                console.log(sprintId);
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
