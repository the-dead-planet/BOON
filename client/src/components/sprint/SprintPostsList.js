import React from 'react';
import List from '@material-ui/core/List';
// import { makeStyles } from '@material-ui/core/styles';
// import postsService from '../../services/postsService';

// const useStyles = makeStyles(theme => ({}));

export const SprintPostsList = ({ posts }) => {
    // const classes = useStyles();

    return (
        <List>
            {(posts || []).map((post, index) => (
                <div key={index}>
                    <h4>{post.title}</h4>
                    <p>
                        {post.author.username} / {post.created.substring(0, 10)}
                    </p>
                    <p>{post.body}</p>
                </div>
            ))}
        </List>
    );
};
