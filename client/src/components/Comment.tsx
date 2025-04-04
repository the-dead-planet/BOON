import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { Item, ItemMenu } from './ItemMenu';
import * as Types from '../logic/types';
import * as Utils from '../utils';
import * as Hooks from '../hooks';
import * as AppState from '../app-state';

interface Props {
    author: Types.User;
    comment: Types.Comment;
    onCommentToBeDeletedIdChange: (id: string) => void;
}

export const Comment = ({ author, comment, onCommentToBeDeletedIdChange }: Props) => {
    const user = Hooks.useSubject(AppState.user$);
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
                    <Avatar alt={author?.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography component="span" variant="body2">
                                {author?.name}
                            </Typography>
                            <Typography component="span" variant="caption">
                                {` - ${created ?? '...'}`}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={<Typography variant="body2">{comment?.content}</Typography>}
                />

                <ItemMenu items={menuItems} tooltip="More options" />
            </ListItem>
        </>
    );
};
