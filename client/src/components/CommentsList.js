import React from 'react';
import List from '@material-ui/core/List';
import moment from 'moment';
// import { authenticatedPage } from '../../components/authenticatedPage';
import { ObjectDeleteButton } from './Buttons';

export const CommentsList = ({ user, comments, users }) => {
    return (
        <List>
            {(comments || []).map((comment, index) => (
                <div key={index}>
                    <h4>
                        {users.get(comment.author).publicName} / {moment(comment.created).fromNow()}
                    </h4>
                    <p>{comment.body}</p>

                    <ObjectDeleteButton user={user} model="Comment" object={comment} />
                </div>
            ))}
        </List>
    );
};
