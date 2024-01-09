import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { Item, ItemMenu } from './ItemMenu';
import { User, Comment as CommentType } from '../logic/types';
import * as Utils from '../utils';

interface Props {
    user: User;
    author: User;
    comment: CommentType;
    onCommentToBeDeletedIdChange: (id: string) => void;
}

export const Comment = ({ user, author, comment, onCommentToBeDeletedIdChange }: Props) => {
    const menuItems = React.useMemo(
        () => {
            const items: Item[] = [{ name: 'Report', onClick: () => null }];
            if (user && comment.author === user._id) {
                items.push({ name: 'Delete', onClick: () => onCommentToBeDeletedIdChange(comment._id) });
                // TODO: Prepare solution for reporting naughty users
            }
            return items;
        },
        [user, comment.author, onCommentToBeDeletedIdChange]
    ); 

    const created = React.useMemo(
        (): string | null => Utils.DateTime.getRelativeCalendar(comment.created), 
        [comment.created]
    );

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
                                {` - ${created ?? '...'}`}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={<Typography variant="body2">{comment?.body}</Typography>}
                />

                <ItemMenu items={menuItems} tooltip="More options" />
            </ListItem>
        </>
    );
};
