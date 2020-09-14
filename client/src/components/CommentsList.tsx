import React from 'react';
import { Divider, List } from '@material-ui/core';
import { Comment } from './Comment';
import { User, Comment as CommentType } from '../logic/types';

interface Props {
    user: User;
    comments: Array<CommentType>;
    users: Map<string, User>;
    removeComment: any;
}

export const CommentsList = ({ user, comments, users, removeComment }: Props) => {
    return (
        <List>
            <Divider component="li" />
            {(comments || []).map((comment, i) => (
                <Comment key={i} user={user} comment={comment} users={users} removeComment={removeComment} />
            ))}
        </List>
    );
};
