import React from 'react';
import { Box } from '@material-ui/core';
import { CommentsList } from './CommentsList';
import { withPush } from '../utils/routingDecorators';
import { AddComment } from './forms/Comment';
import CollapsePanel from './transitions/CollapsePanel';
import { User, Comment as CommentType, MongoObject, Model } from '../logic/types';

interface Props {
    expanded: boolean;
    user: User;
    object: MongoObject;
    model: Model;
    comments: Array<Comment>;
    users: Map<string, User>;
    addComment: any;
    removeComment: any;
    push: any;
}

// A common trick to silence missing props in react components.
// TODO: fix props instead.
const anyProps: any = {};

const CommentsImpl = ({ expanded, user, object, model, comments, users, addComment, removeComment, push }: Props) => {
    return (
        <Box id="comments">
            <CollapsePanel expanded={expanded} title="Comments">
                <Box>
                    <CommentsList
                        user={user}
                        comments={comments}
                        users={users}
                        push={push}
                        removeComment={removeComment}
                        {...anyProps}
                    />
                    <AddComment
                        user={user}
                        _id={object._id}
                        model={model}
                        addComment={addComment}
                        push={push}
                        {...anyProps}
                    />
                </Box>
            </CollapsePanel>
        </Box>
    );
};

const CommentsSection = withPush(CommentsImpl);

export { CommentsSection };
