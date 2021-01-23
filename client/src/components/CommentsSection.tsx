import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { CommentsList } from './CommentsList';
import { withPush } from '../utils/routingDecorators';
import { AddComment } from './forms/AddComment';
// import CollapsePanel from './transitions/CollapsePanel';
import DialogMenu from './navigation/DialogMenu';
import commentsService from '../services/commentsService';
import { User, Comment, Model } from '../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            margin: theme.spacing(2),
        },
        title: {
            margin: theme.spacing(2),
        },
    })
);

interface Props {
    expanded: boolean;
    user: User;
    title: string;
    parentId: string;
    parentModel: Model;
    comments: Array<Comment>;
    users: Map<string, User>;
    addComment: any;
    removeComment: any;
    push: any;
    onError?: any;
}

// A common trick to silence missing props in react components.
// TODO: fix props instead.
const anyProps: any = {};

const CommentsImpl = ({
    expanded,
    user,
    title,
    parentId,
    parentModel,
    comments,
    users,
    addComment,
    removeComment,
    push,
    onError,
}: Props) => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [commentToBeDeletedId, setCommentToBeDeletedId] = useState('');

    const handleDialogClose = () => {
        setOpenDialog(false);
        setCommentToBeDeletedId('');
    };

    const handleDialogOpen = (id: string) => {
        setOpenDialog(true);
        setCommentToBeDeletedId(id);
    };

    return (
        <>
            <Box id="comments">
                {/* <CollapsePanel expanded={expanded} title="Comments"> */}

                <Typography variant="h6" color="secondary" gutterBottom className={classes.title}>
                    {title} ({comments.length})
                </Typography>

                <Box className={classes.form}>
                    <AddComment
                        user={user}
                        _id={parentId}
                        model={parentModel}
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
                    setCommentToBeDeletedId={handleDialogOpen}
                    {...anyProps}
                />
                {/* </CollapsePanel> */}
            </Box>

            {/* Dialog for delete comment alert */}
            <DialogMenu
                open={openDialog}
                message="Are you sure you want to delete this opinion?"
                contextText="Deleted opinions are gone forever."
                handleClose={handleDialogClose}
                buttonOk={{
                    text: 'Yes, delete it',
                    // Remove from DB, then from app state, then close the dialog window and clear the id to be deleted
                    onClick: () => {
                        commentsService
                            .delete({ objectId: commentToBeDeletedId })
                            .then((response) => {
                                removeComment(response);
                                handleDialogClose();
                            })
                            .catch(onError); // TODO: add this prop
                    },
                }}
            />
        </>
    );
};

const CommentsSection = withPush(CommentsImpl);

export { CommentsSection };
