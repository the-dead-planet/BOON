import React from 'react';
import List from '@material-ui/core/List';
// import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { EXT_DATE_FORMAT } from '../../utils/constants';
import { ObjectDeleteButton } from './SprintButtons';
import { AddComment } from './AddComment';

// const useStyles = makeStyles(theme => ({}));

export const SprintPostsList = ({ user, sprintId, posts, push }) => {
    // const classes = useStyles();

    return (
        <List>
            {(posts || []).map((post, index) => (
                <div key={index}>
                    <h4>{post.title}</h4>
                    <p>
                        {post.author.username} / {moment(post.created).format(EXT_DATE_FORMAT)}
                    </p>
                    <p>{post.body}</p>

                    <ObjectDeleteButton user={user} model="Post" object={post} />
                    <AddComment user={user} _id={post._id} model="Post" push={push} />
                </div>
            ))}
        </List>
    );
};
