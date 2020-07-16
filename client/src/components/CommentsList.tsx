import React from 'react';
import { Divider, List } from '@material-ui/core';
import { Comment } from './Comment';
import { User, Comment as CommentType } from '../logic/types';

interface Props {
    user: User;
    comments: Array<CommentType>;
    users: Map<string, User>;
}

export const CommentsList = ({ user, comments, users }: Props) => {
    return (
        <List>
            <Divider component="li" />
            {(comments || []).map(comment => (
                <Comment key={comment._id} user={user} comment={comment} users={users} />
            ))}
        </List>
    );
};
