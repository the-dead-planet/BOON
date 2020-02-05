import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
// import { authenticatedPage } from '../../components/authenticatedPage';
import { ObjectDelete } from './ObjectDelete';

const useStyles = makeStyles(theme => ({}));

export const SprintCommentsList = ({ user, sprintId, comments, push }) => {
    const classes = useStyles();

    return (
        <List>
            {(comments || []).map((comment, index) => (
                <div key={index}>
                    <h4>
                        {comment.author.username} / {comment.created.substring(0, 10)}
                    </h4>
                    <p>{comment.body}</p>

                    <ObjectDelete user={user} model="Comment" object={comment} />
                </div>
            ))}
        </List>
    );
};
