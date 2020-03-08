import React from 'react';
import List from '@material-ui/core/List';
import { Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { EXT_DATE_FORMAT } from '../../../utils/constants';
import { ObjectDeleteButton } from '../../Buttons';
import { Comments } from '../../Comments';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#FFF',
    },
    offset: {
        padding: '20px',
    },
}));

export const PostsList = ({ user, posts, push }) => {
    const classes = useStyles();

    return (
        <List>
            {(posts || []).map((post, index) => (
                <Box key={index}>
                    <Paper className={`${classes.paper} ${classes.offset}`}>
                        <h4>{post.title}</h4>
                        <p>
                            {post.author.username} / {moment(post.created).format(EXT_DATE_FORMAT)}
                        </p>
                        <p>{post.body}</p>

                        <ObjectDeleteButton user={user} model="Post" object={post} />
                        <Comments user={user} model="Post" comments={post.comments} />
                    </Paper>
                </Box>
            ))}
        </List>
    );
};
