import React from 'react';
import { Box } from '@material-ui/core';
import { CommentsList } from './CommentsList';
import { withPush } from '../utils/routingDecorators';
import { MODELS } from '../utils/constants';
import { AddComment } from './forms/Comment';
import CollapsePanel from './transitions/CollapsePanel';

const CommentsImpl = ({ expanded, user, object, model, comments, users, updateStateData, push }) => {
    return (
        <Box id="comments">
            <CollapsePanel expanded={expanded}>
                <CommentsList user={user} comments={comments} users={users} push={push} />
                <AddComment user={user} _id={object._id} model={model} updateStateData={updateStateData} push={push} />
            </CollapsePanel>
        </Box>
    );
};

const CommentsSection = withPush(CommentsImpl);

export { CommentsSection };
