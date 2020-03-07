import React from 'react';
import List from '@material-ui/core/List';
// import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
// import { authenticatedPage } from '../../components/authenticatedPage';
import { ObjectDeleteButton } from '../../Buttons';

// const useStyles = makeStyles(theme => ({}));

export const SprintCommentsList = ({ user, sprintId, comments, push }) => {
    // const classes = useStyles();

    return (
        <List>
            {(comments || []).map((comment, index) => (
                <div key={index}>
                    <h4>
                        {comment.author.username} / {moment(comment.created).fromNow()}
                    </h4>
                    <p>{comment.body}</p>

                    <ObjectDeleteButton user={user} model="Comment" object={comment} />
                </div>
            ))}
        </List>
    );
};
