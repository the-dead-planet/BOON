import React from 'react';
import { Formik, Form } from 'formik';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import postsService from '../../services/postsService';

const useStyles = makeStyles(theme => ({}));

export const SprintPostsList = ({ user, sprintId, posts, push }) => {
    const classes = useStyles();

    return (
        <List>
            {(posts || []).map((post, index) => (
                <div key={index}>
                    <h4>{post.title}</h4>
                    <p>
                        {post.author.username} / {post.created.substring(0, 10)}
                    </p>
                    <p>{post.body}</p>

                    {user && post.author.id === user._id ? (
                        <Formik
                            initialValues={{}}
                            onSubmit={data => {
                                const extendedData = {
                                    ...data,
                                    postId: post._id,
                                };
                                console.log(typeof sprintId);
                                return postsService.delete(extendedData).then(() => {
                                    push('/posts');
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
