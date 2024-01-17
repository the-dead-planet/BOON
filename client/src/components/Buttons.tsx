import React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { ServicesT, useServices } from '../services';
import * as Routes from '../routes';
import * as Types from '../logic/types';
import * as Hooks from '../hooks';
import * as AppState from '../app-state';

interface DeleteProps {
    model: Types.Model;
    object: Types.MongoObject;
    push?: (path: string) => void;
    onError?: (err: Error) => void;
    removeObject:  (obj: Types.WithObjectId) => void;
}

const makeModels = (services: ServicesT) => [
    {
        name: 'Sprint',
        service: services.sprintsService,
        path: Routes.Types.RouterPaths.Sprints,
    },
    {
        name: 'Post',
        service: services.postsService,
        path: Routes.Types.RouterPaths.Posts,
    },
    {
        name: 'Comment',
        service: services.commentsService,
        path: Routes.Types.RouterPaths.Comments,
    },
];

// TODO: delete those `any` casts. Typescript correctly detects type violations in the functions below.
export const ObjectDeleteButton: React.FC<DeleteProps> = ({ model, object, onError, removeObject }: DeleteProps) => {
    const services = useServices()!;
    const user = Hooks.useSubject(AppState.user$);

    return user && object && 'author' in object && object.author === user._id ? (
        <MenuItem
            color="inherit"
            onClick={() =>
                makeModels(services)
                    .reduce((acc, val) => (val.name === model ? val : acc))
                    .service.delete({ objectId: object._id })
                    .then((response) => {
                        removeObject(response);
                    })
                    .catch(onError)
            }
        >
            Delete
        </MenuItem>
    ) : null;
};

export const IconDelete: React.FC<DeleteProps> = ({ model, object, onError, removeObject }) => {
    const services = useServices()!;
    const user = Hooks.useSubject(AppState.user$);

    return user && object && 'author' in object && object.author === user._id ? (
        <DeleteIcon
            fontSize="small"
            color="inherit"
            onClick={() =>
                makeModels(services)
                    .reduce((acc, val) => (val.name === model ? val : acc))
                    .service.delete({ objectId: object._id })
                    .then((response) => {
                        removeObject(response);
                    })
                    .catch(onError)
            }
        />
    ) : null;
};

interface EditProps {
    model: string;
    object: Types.MongoObject;
}

export const ObjectEditButton: React.FC<EditProps> = ({ model, object }) => {
    const services = useServices()!;
    const models = makeModels(services);
    const user = Hooks.useSubject(AppState.user$);

    return user && object && 'author' in object && typeof object.author !== 'string' && object.author?._id === user._id ? (
        <Button
            color="inherit"
            href={`${models.reduce((acc, val) => (val.name === model ? val : acc)).path}/${object._id}/edit`}
        >
            Edit
        </Button>
    ) : null;
};

interface AddProps {
    sprint: Types.Sprint;
}

export const AddPostButton: React.FC<AddProps> = ({ sprint }: AddProps) => {
    const services = useServices()!;
    const models = makeModels(services);
    const user = Hooks.useSubject(AppState.user$);

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
    user: Types.User | null | undefined;
    object: Types.MongoObject;
    onClick: () => void;
}
export const AddCommentButton = ({ user, object, onClick }: AddCommentProps) => {
    return user && object ? (
        <Button color="inherit" href="" onClick={onClick}>
            Add Comment
        </Button>
    ) : null;
};
