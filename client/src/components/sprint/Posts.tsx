import React from 'react';
import { PostsList } from './PostList';
import { withPush } from '../../utils/routingDecorators';
import { User, Post, Project, Comment, Like, PostsListVariant, Col } from '../../logic/types';

interface Props {
    user: User;
    variant?: PostsListVariant;
    projects: Map<string, Project>;
    posts: Array<Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    addComment: any;
    removePost: any;
    removeComment: any;
    push: any;
    toggleCommentsPanel: any;
    xs?: Col;
    sm?: Col;
    md?: Col;
    lg?: Col;
    xl?: Col;
}

// Implementation of the component. Note, that it expects to receive a `push` property from the caller. It's injected throught the `withPush` HOF below.
// Only the decorated instance is exported. The `*Impl` class is here for convenience only and is not directly used outside of this file.
const PostsImpl = ({
    user,
    variant = 'tiles',
    posts,
    projects,
    comments,
    likes,
    users,
    addComment,
    removeComment,
    removePost,
    push,
    toggleCommentsPanel,
    ...props
}: Props) => (
    <PostsList
        user={user}
        variant={variant}
        projects={projects}
        posts={posts}
        comments={comments}
        likes={likes}
        users={users}
        addComment={addComment}
        removePost={removePost}
        removeComment={removeComment}
        push={push}
        toggleCommentsPanel={toggleCommentsPanel}
        {...props}
    />
);

// Decorate the component with `withPush` HOF to inject the `push` property.
const Posts = withPush(PostsImpl);

export { Posts };
