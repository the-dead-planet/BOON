import React from 'react';
import { List } from '@material-ui/core';
import { Comment } from './Comment';
import { User, Comment as CommentType } from '../logic/types';

interface Props {
    user: User;
    comments: Array<CommentType>;
    users: Map<string, User>;
    setCommentToBeDeletedId: any;
}

export const CommentsList = ({ user, comments, users, setCommentToBeDeletedId }: Props) => {
    return (
        <List>
            {/* <Divider variant="middle" /> */}
            {comments
                ?.sort((a, b) => new Date(b?.created).getTime() - new Date(a?.created).getTime())
                .map((comment, i) => (
                    <Comment
                        key={i}
                        user={user}
                        comment={comment}
                        author={users.get(comment.author)}
                        setCommentToBeDeletedId={setCommentToBeDeletedId}
                    />
                ))}
        </List>
    );
};
