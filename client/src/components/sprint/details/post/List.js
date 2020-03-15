import React from 'react';
import List from '@material-ui/core/List';
import { PostCard } from './Card';


export const PostsList = ({ user, posts, push }) => {

    return (
        <List>
            {(posts || []).map(post => (
                <PostCard key={post._id} user={user} post={post} />
            ))}
        </List>
    );
};
