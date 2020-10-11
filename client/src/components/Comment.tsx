import React from 'react';
// import { useStyles } from '../styles/main';
import moment from 'moment';
import { ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { User, Comment as CommentType } from '../logic/types';

interface Props {
    user: User;
    comment: CommentType;
    users: Map<string, User>;
    setCommentToBeDeletedId: any;
}

export const Comment = ({ user, comment, users, setCommentToBeDeletedId }: Props) => {
    // const classes = useStyles();
    const author = users.get(comment?.author)?.publicName;
    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={author} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography component="span" variant="body2" color="textPrimary">
                                {author}
                            </Typography>
                            <Typography component="span" variant="caption" color="textPrimary">
                                {` - ${moment(comment?.created).fromNow()}`}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={comment?.body}
                />
                {/* TODO: Removing works but the page is not re-rendered */}
                {users.get(comment?.author)?.publicName === user?.publicName && (
                    <IconButton aria-label="remove comment">
                        {/* <IconDelete user={user} model="Comment" object={comment} setCommentToBeDeletedId={setCommentToBeDeletedId} /> */}
                        {user && comment.author === user._id ? (
                            <DeleteIcon
                                fontSize="small"
                                color="inherit"
                                onClick={() => setCommentToBeDeletedId(comment._id)}
                            />
                        ) : undefined}
                    </IconButton>
                )}
            </ListItem>
            {/* <Divider variant="inset" component="li" /> */}
        </React.Fragment>
    );
};
