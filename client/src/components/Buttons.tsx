import React from 'react';
import Button from '@material-ui/core/Button';
import commentsService from '../services/commentsService';
import postsService from '../services/postsService';
import sprintsService from '../services/sprintsService';
import MenuItem from '@material-ui/core/MenuItem';
import { User, Sprint, MongoObject, Model } from '../logic/types';

const models = [
    {
        name: 'Sprint',
        service: sprintsService,
        path: '/sprints',
    },
    {
        name: 'Post',
        service: postsService,
        path: '/posts',
    },
    {
        name: 'Comment',
        service: commentsService,
        path: '/comments',
    },
];

interface DeleteProps {
    user: User | null | undefined;
    model: Model;
    object: MongoObject;
    push?: any;
    onError?: any;
}

// TODO: delete those `any` casts. Typescript correctly detects type violations in the functions below.
export const ObjectDeleteButton = ({ user, model, object, push, onError }: DeleteProps) => {
    return user && object && (object as any).author._id === user._id ? (
        <MenuItem
            color="inherit"
            onClick={data => {
                const extendedData = {
                    ...data,
                    objectId: object._id,
                };

                return models
                    .reduce((acc, val) => (val.name === model ? val : acc))
                    .service.delete(extendedData)
                    .catch(onError);
            }}
        >
            Delete
        </MenuItem>
    ) : null;
};

interface EditProps {
    user: User | null | undefined;
    model: string;
    object: MongoObject;
}

export const ObjectEditButton = ({ user, model, object }: EditProps) => {
    return user && object && (object as any).author._id === user._id ? (
        <Button
            color="inherit"
            href={`${models.reduce((acc, val) => (val.name === model ? val : acc)).path}/${object._id}/edit`}
        >
            Edit
        </Button>
    ) : null;
};

interface AddProps {
    user: User | null | undefined;
    sprint: Sprint;
}

export const AddPostButton = ({ user, sprint }: AddProps) => {
    return user && sprint ? (
        <Button
            color="inherit"
            href={`${models.reduce((acc, val) => (val.name === 'Sprint' ? val : acc)).path}/${sprint._id}/add_post`}
        >
            Add Post
        </Button>
    ) : null;
};

interface AddCommentProps {
    user: User | null | undefined;
    object: MongoObject;
    onClick: any;
}
export const AddCommentButton = ({ user, object, onClick }: AddCommentProps) => {
    return user && object ? (
        <Button color="inherit" href="" onClick={onClick}>
            Add Comment
        </Button>
    ) : null;
};
