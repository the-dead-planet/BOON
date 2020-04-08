import React from 'react';
import { PostsList } from './List';
// import { SprintAddPost } from './SprintAddPost';
// import { authenticatedPage } from '../../components/authenticatedPage';
import { withPush } from '../../../../utils/routingDecorators';

// Implementation of the component. Note, that it expects to receive a `push` property from the caller. It's injected throught the `withPush` HOF below.
// Only the decorated instance is exported. The `*Impl` class is here for convenience only and is not directly used outside of this file.
const PostsImpl = ({ user, posts, comments, likes, users, push }) => {
    return <PostsList user={user} posts={posts} comments={comments} likes={likes} users={users} push={push} />;
};

// Decorate the component with `withPush` HOF to inject the `push` property.
const Posts = withPush(PostsImpl);

export { Posts };
