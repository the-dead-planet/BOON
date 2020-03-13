import React from 'react';
import { ObjectDeleteButton, ObjectEditButton, AddPostButton } from '../../Buttons';

/*  
    Allow Edit and Delete only if user is logged in and is the author of the sprint
    Allow Add Post to all logged in users
*/
export const SprintModifyButtons = ({ user, sprint, model, onError }) => {
    return user && sprint ? (
        <React.Fragment>
            {sprint.author.id === user._id ? (
                <React.Fragment>
                    <ObjectDeleteButton user={user} model={model} object={sprint} onError={onError} />
                    <ObjectEditButton user={user} model={model} object={sprint} />
                </React.Fragment>
            ) : null}

            <AddPostButton user={user} sprint={sprint} />
            {/* <AddCommentButton user={user} object={sprint} onClick={console.log("clicked")} /> */}
        </React.Fragment>
    ) : null;
};
