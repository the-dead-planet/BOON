import React from 'react';
// import { useStyles } from '../styles/main';
import moment from 'moment';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';
import { ItemMenu } from './ItemMenu';
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

    // Prepare list of menu items
    const items = [{ name: 'Report', onClick: () => null }]; // TODO: Prepare solution for reporting naughty users
    if (user && comment.author === user._id) {
        items.push({ name: 'Delete', onClick: () => setCommentToBeDeletedId(comment._id) });
    }

    return (
        <>
            {/* <div style={{ border: "solid 1px rgba(0, 0, 0, .4)", margin: "1em"}}> */}
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

                <ItemMenu items={items} tooltip="More options" />
            </ListItem>
            {/* <Divider variant="inset" component="li" /> */}
            {/* </div> */}
        </>
    );
};
