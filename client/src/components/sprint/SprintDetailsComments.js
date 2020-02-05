import React from 'react';
import { Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { SprintCommentsList } from './SprintCommentsList';
import { SprintAddComment } from './SprintAddComment';
import { authenticatedPage } from '../../components/authenticatedPage';
import { withPush } from '../../utils/routingDecorators';

// const useStyles = makeStyles(theme => ({}));

const SprintDetailsCommentsImpl = ({ user, _id, comments, push }) => {
    // const classes = useStyles();

    return (
        <Box id={'comments'}>
            <h2>Comments</h2>
            <SprintCommentsList user={user} sprintId={_id} comments={comments} push={push} />
            <SprintAddComment user={user} _id={_id} push={push} />
        </Box>
    );
};

const SprintDetailsComments = withPush(SprintDetailsCommentsImpl);

export { SprintDetailsComments };
