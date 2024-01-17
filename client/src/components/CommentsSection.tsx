import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Box, Typography, Theme } from '@mui/material';
import { CommentsList } from './CommentsList';
import { AddComment } from './forms/AddComment';
// import CollapsePanel from './transitions/CollapsePanel';
import DialogMenu from './navigation/DialogMenu';
import { useServices } from '../services';
import { User, Comment, Model, WithObjectId } from '../logic/types';

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
    title: string;
    parentId: string;
    parentModel: Model;
    comments: Array<Comment>;
    users: Map<string, User>;
    addComment: (id: string, comment: Comment) => void;
    removeComment: (comment: WithObjectId) => void;
    onError?: (err: Error) => void;
}

const CommentsImpl: React.FC<Props> = ({
    title,
    parentId,
    parentModel,
    comments,
    users,
    addComment,
    removeComment,
    onError
}) => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [commentToBeDeletedId, setCommentToBeDeletedId] = React.useState('');
    const { commentsService } = useServices()!;

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
                    <AddComment _id={parentId} model={parentModel} addComment={addComment} />
                </Box>

                <CommentsList
                    comments={comments}
                    users={users}
                    onCommentToBeDeletedIdChange={handleDialogOpen}
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

const CommentsSection = CommentsImpl;

export { CommentsSection };
