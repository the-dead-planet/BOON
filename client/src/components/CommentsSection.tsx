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
    updateStateData: any;
    push: any;
}

const CommentsImpl = ({ expanded, user, object, model, comments, users, updateStateData, push }: Props) => {
    return (
        <Box id="comments">
            <CollapsePanel expanded={expanded} title="Comments">
                <Box >
                    <CommentsList user={user} comments={comments} users={users} push={push} />
                    <AddComment user={user} _id={object._id} model={model} updateStateData={updateStateData} push={push} />
                </Box>
            </CollapsePanel>
        </Box>
    );
};

const CommentsSection = withPush(CommentsImpl);

export { CommentsSection };
