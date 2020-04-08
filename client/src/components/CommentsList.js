import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Comment } from './Comment';

export const CommentsList = ({ user, comments, users }) => {
    return (
        <List>
            <Divider component="li" />
            {(comments || []).map(comment => (
                <Comment key={comment._id} user={user} comment={comment} users={users} />
            ))}
        </List>
    );
};
