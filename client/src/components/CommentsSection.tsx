import React from 'react';
import { useStyles } from '../styles/main';
import { Box, Typography } from '@material-ui/core';
import { CommentsList } from './CommentsList';
import { withPush } from '../utils/routingDecorators';
import { AddComment } from './forms/Comment';
// import CollapsePanel from './transitions/CollapsePanel';
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
    const classes = useStyles();

    return (
        <Box id="comments">
            {/* <CollapsePanel expanded={expanded} title="Comments"> */}

            <Typography color="secondary" gutterBottom className={classes.commentsTitle}>
                Opinions ({comments.length})
            </Typography>

            <Box className={classes.addComment}>
                <AddComment
                    user={user}
                    _id={object._id}
                    model={model}
                    addComment={addComment}
                    push={push}
                    {...anyProps}
                />
            </Box>

            <CommentsList
                user={user}
                comments={comments}
                users={users}
                push={push}
                removeComment={removeComment}
                {...anyProps}
            />
        </Box>
        /* </CollapsePanel> */
    );
};

const CommentsSection = withPush(CommentsImpl);

export { CommentsSection };
