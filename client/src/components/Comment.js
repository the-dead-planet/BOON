import React from 'react';
import { useStyles } from '../styles/main';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ObjectDeleteButton } from './Buttons';

export const Comment = ({ user, comment, users }) => {
    const classes = useStyles();
    const author = users.get(comment.author).publicName;

    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={author} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                                {author}
                            </Typography>
                            <Typography
                                component="span"
                                variant="caption"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {` - ${moment(comment.created).fromNow()}`}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={comment.body}
                />
            </ListItem>
            {/* <Divider variant="inset" component="li" /> */}
        </React.Fragment>
    );
};
