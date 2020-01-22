import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui'; // Use the formik-ready variants of form fields.
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SprintPostsList } from './SprintPostsList';
import { SprintAddPost } from './SprintAddPost';
import postsService from '../../services/postsService';
import { authenticatedPage } from '../../components/authenticatedPage';
import { withPush } from '../../utils/routingDecorators';

const useStyles = makeStyles(theme => ({}));

export const SprintDetailsPosts = ({ user, _id, posts, push }) => {
    const classes = useStyles();

    return (
        <Box id={'posts'}>
            <SprintPostsList user={user} posts={posts} />
            <SprintAddPost user={user} _id={_id} push={push} />
        </Box>
    );
};
