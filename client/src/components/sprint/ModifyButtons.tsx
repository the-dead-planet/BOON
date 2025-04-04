import React from 'react';
import { ObjectDeleteButton, ObjectEditButton, AddPostButton } from '../Buttons';
import { User, Sprint, Model } from '../../logic/types';

/*  
    Allow Edit and Delete only if user is logged in and is the author of the sprint
    Allow Add Post to all logged in users
*/

interface Props {
    user: User;
    sprint: Sprint;
    model: Model;
    onError?: (err: Error) => void;
}

export const SprintModifyButtons = ({ user, sprint, model, onError }: Props) => {
    return user && sprint ? (
        <React.Fragment>
            {sprint && user && sprint.author?._id === user._id ? (
                <React.Fragment>
                    <ObjectDeleteButton
                        model={model}
                        object={sprint}
                        onError={onError}
                        removeObject={() => {}}
                    />
                    <ObjectEditButton model={model} object={sprint} />
                </React.Fragment>
            ) : null}

            <AddPostButton sprint={sprint} />
            {/* <AddCommentButton user={user} object={sprint} onClick={console.log("clicked")} /> */}
        </React.Fragment>
    ) : null;
};
