import React from 'react';
import Button from '@material-ui/core/Button';
import commentsService from '../services/commentsService';
import postsService from '../services/postsService';
import sprintsService from '../services/sprintsService';
import MenuItem from '@material-ui/core/MenuItem';
import { User, Sprint, Object } from '../logic/types';

const models = {
    Sprint: {
        service: sprintsService,
        path: '/sprints',
    },
    Post: {
        service: postsService,
        path: '/posts',
    },
    Comment: {
        service: commentsService,
        path: '/comments',
    },
};

interface DeleteProps {
    user: User;
    model: string;
    object: Object;
    push: any;
    onError: any;
}

export const ObjectDeleteButton = ({ user, model, object, push, onError }: DeleteProps) => {
    return user && object && object.author._id === user._id ? (
        <MenuItem
            color="inherit"
            onClick={data => {
                const extendedData = {
                    ...data,
                    objectId: object._id,
                };

                return models[model].service.delete(extendedData).catch(onError);
            }}
        >
            Delete
        </MenuItem>
    ) : null;
};

interface EditProps {
    user: User;
    model: string;
    object: Object;
}

export const ObjectEditButton = ({ user, model, object }: EditProps) => {
    return user && object && object.author._id === user._id ? (
        <Button color="inherit" href={`${models[model].path}/${object._id}/edit`}>
            Edit
        </Button>
    ) : null;
};

interface AddProps {
    user: User;
    sprint: Sprint;
}

export const AddPostButton = ({ user, sprint }: AddProps) => {
    return user && sprint ? (
        <Button color="inherit" href={`${models['Sprint'].path}/${sprint._id}/add_post`}>
            Add Post
        </Button>
    ) : null;
};

interface AddCommentProps {
    user: User;
    object: Object;
    onClick: any;
}
export const AddCommentButton = ({ user, object, onClick }: AddCommentProps) => {
    return user && object ? (
        <Button color="inherit" href="" onClick={onClick}>
            Add Comment
        </Button>
    ) : null;
};
