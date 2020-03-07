import React from 'react';
import { Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { SprintPostsList } from './PostsList';
// import { SprintAddPost } from './SprintAddPost';
// import { authenticatedPage } from '../../components/authenticatedPage';
import { withPush } from '../../../utils/routingDecorators';

// const useStyles = makeStyles(theme => ({}));

// Implementation of the component. Note, that it expects to receive a `push` property from the caller. It's injected throught the `withPush` HOF below.
// Only the decorated instance is exported. The `*Impl` class is here for convenience only and is not directly used outside of this file.
const SprintPostsImpl = ({ user, _id, posts, push }) => {
    // const classes = useStyles();

    return (
        <Box id={'posts'}>
            <h2>Posts</h2>
            <SprintPostsList user={user} sprintId={_id} posts={posts} push={push} />
        </Box>
    );
};

// Decorate the component with `withPush` HOF to inject the `push` property.
const SprintPosts = withPush(SprintPostsImpl);

export { SprintPosts };
