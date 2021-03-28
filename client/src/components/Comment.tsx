import React from 'react';
import moment from 'moment';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';
import { ItemMenu } from './ItemMenu';
import { User, Comment as CommentType } from '../logic/types';

interface Props {
    user: User;
    author: User;
    comment: CommentType;
    setCommentToBeDeletedId: any;
}

export const Comment = ({ user, author, comment, setCommentToBeDeletedId }: Props) => {
    // Prepare list of menu items
    const items = [{ name: 'Report', onClick: () => null }]; // TODO: Prepare solution for reporting naughty users
    if (user && comment.author === user._id) {
        items.push({ name: 'Delete', onClick: () => setCommentToBeDeletedId(comment._id) });
    }

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={author?.publicName} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography component="span" variant="body2">
                                {author?.publicName}
                            </Typography>
                            <Typography component="span" variant="caption">
                                {` - ${moment(comment?.created).fromNow()}`}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={<Typography variant="body2">{comment?.body}</Typography>}
                />

                <ItemMenu items={items} tooltip="More options" />
            </ListItem>
        </>
    );
};
