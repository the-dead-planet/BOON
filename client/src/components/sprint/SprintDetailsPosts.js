import React from 'react';
import { Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { SprintPostsList } from './SprintPostsList';
import { SprintAddPost } from './SprintAddPost';
import { authenticatedPage } from '../../components/authenticatedPage';
import { withPush } from '../../utils/routingDecorators';

// const useStyles = makeStyles(theme => ({}));

export const SprintDetailsPosts = ({ user, _id, posts, push }) => {
    // const classes = useStyles();

    return (
        <Box id={'posts'}>
            <h2>Posts</h2>
            <SprintPostsList user={user} sprintId={_id} posts={posts} push={push} />
            <SprintAddPost user={user} _id={_id} push={push} />
        </Box>
    );
};
