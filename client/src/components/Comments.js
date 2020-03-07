import React from 'react';
import { Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { CommentsList } from './CommentsList';
// import { authenticatedPage } from '../../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import { AddComment } from './forms/Comment';
import CollapsePanel from './transitions/CollapsePanel';
// const useStyles = makeStyles(theme => ({}));

const CommentsImpl = ({ user, _id, model, comments, push }) => {
    // const classes = useStyles();

    return (
        <Box id={'comments'}>
            <CollapsePanel title={comments ? `${comments.length} opinions` : "Opinions"}>
                <CommentsList user={user} comments={comments} push={push} />
                <AddComment user={user} _id={_id} model={model} push={push} />
            </CollapsePanel>
        </Box>
    );
};

const Comments = withPush(CommentsImpl);

export { Comments };
