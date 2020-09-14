import React from 'react';
import { PostsList } from './List';
// import { SprintAddPost } from './SprintAddPost';
// import { authenticatedPage } from '../../components/authenticatedPage';
import { withPush } from '../../../../utils/routingDecorators';
import { User, Post, Project, Comment, Like } from '../../../../logic/types';

interface Props {
    user: User;
    projects: Map<string, Project>;
    posts: Array<Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    addComment: any;
    removePost: any;
    removeComment: any;
    push: any;
}

// Implementation of the component. Note, that it expects to receive a `push` property from the caller. It's injected throught the `withPush` HOF below.
// Only the decorated instance is exported. The `*Impl` class is here for convenience only and is not directly used outside of this file.
const PostsImpl = ({
    user,
    posts,
    projects,
    comments,
    likes,
    users,
    addComment,
    removeComment,
    removePost,
    push,
}: Props) => (
    <PostsList
        user={user}
        projects={projects}
        posts={posts}
        comments={comments}
        likes={likes}
        users={users}
        addComment={addComment}
        removePost={removePost}
        removeComment={removeComment}
        push={push}
    />
);

// Decorate the component with `withPush` HOF to inject the `push` property.
const Posts = withPush(PostsImpl);

export { Posts };
