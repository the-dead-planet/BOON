import React from 'react';
import { Box } from '@material-ui/core';
import { CommentsList } from './CommentsList';
import { withPush } from '../utils/routingDecorators';
import { AddComment } from './forms/Comment';
import CollapsePanel from './transitions/CollapsePanel';

const CommentsImpl = ({ expanded, user, _id, model, comments, push }) => {
    // const classes = useStyles();

    return (
        <Box id="comments">
            <CollapsePanel expanded={expanded}>
                <CommentsList user={user} comments={comments} push={push} />
                <AddComment user={user} _id={_id} model={model} push={push} />
            </CollapsePanel>
        </Box>
    );
};

const Comments = withPush(CommentsImpl);

export { Comments };
