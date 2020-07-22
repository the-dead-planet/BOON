import React from 'react';
import { useStyles } from '../styles/main';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
// import { ObjectDeleteButton } from './Buttons';
import { User, Comment as CommentType } from '../logic/types';

interface Props {
    user: User;
    comment: CommentType;
    users: Map<string, User>;
}

export const Comment = ({ user, comment, users }: Props) => {
    const classes = useStyles();
    const author = users.get(comment.author)?.publicName;

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
                                {` - ${moment(comment.created).fromNow()}`}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={comment.body}
                />
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </ListItem>
            {/* <Divider variant="inset" component="li" /> */}
        </React.Fragment>
    );
};
