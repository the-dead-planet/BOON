import React from 'react';
import { Box } from '@material-ui/core';
import { CommentsList } from './CommentsList';
import { withPush } from '../utils/routingDecorators';
import { AddComment } from './forms/Comment';
import CollapsePanel from './transitions/CollapsePanel';

const CommentsImpl = ({ expanded, user, _id, comments, model, users, updateStateData, push }) => {
    return (
        <Box id="comments">
            <CollapsePanel expanded={expanded}>
                <CommentsList user={user} comments={comments} users={users} push={push} />
                <AddComment user={user} _id={_id} model={model} updateStateData={updateStateData} push={push} />
            </CollapsePanel>
        </Box>
    );
};

const CommentsSection = withPush(CommentsImpl);

export { CommentsSection };
