import React from 'react';
import { Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { SprintCommentsList } from './SprintCommentsList';
// import { authenticatedPage } from '../../components/authenticatedPage';
import { withPush } from '../../utils/routingDecorators';
import { AddComment } from '../sprint/AddComment';
import CollapsePanel from '../transitions/CollapsePanel';
// const useStyles = makeStyles(theme => ({}));

const SprintDetailsCommentsImpl = ({ user, _id, comments, push }) => {
    // const classes = useStyles();

    return (
        <Box id={'comments'}>
            <CollapsePanel title="Comments">
                <SprintCommentsList user={user} sprintId={_id} comments={comments} push={push} />
                <AddComment user={user} _id={_id} model="Sprint" push={push} />
            </CollapsePanel>
        </Box>
    );
};

const SprintDetailsComments = withPush(SprintDetailsCommentsImpl);

export { SprintDetailsComments };
