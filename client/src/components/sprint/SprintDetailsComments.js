import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SprintCommentsList } from './SprintCommentsList';
import { SprintAddComment } from './SprintAddComment';
import { authenticatedPage } from '../../components/authenticatedPage';
import { withPush } from '../../utils/routingDecorators';

const useStyles = makeStyles(theme => ({
    rootForm: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '100%',
            margin: '0 auto',
        },
    },
    root: {
        padding: theme.spacing(3, 2),
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    offset: {
        padding: '20px',
    },
}));

export const SprintDetailsComments = ({ user, _id, comments, push }) => {
    const classes = useStyles();

    return (
        <Box id={'comments'}>
            <SprintCommentsList user={user} comments={comments} />
            <SprintAddComment user={user} _id={_id} push={push} />
        </Box>
    );
};
