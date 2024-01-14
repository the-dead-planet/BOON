import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { User, Sprint, MongoObject, Model, WithObjectId } from '../logic/types';
import { ServicesT, useServices } from '../services';
// import { PATHS } from '../constants/data';
// const { main } = PATHS;

interface DeleteProps {
    user: User | null | undefined;
    model: Model;
    object: MongoObject;
    push?: (path: string) => void;
    onError?: (err: Error) => void;
    removeObject:  (obj: WithObjectId) => void;
}

const makeModels = (services: ServicesT) => [
    {
        name: 'Sprint',
        service: services.sprintsService,
        path: '/sprints',
    },
    {
        name: 'Post',
        service: services.postsService,
        path: '/posts',
    },
    {
        name: 'Comment',
        service: services.commentsService,
        path: '/comments',
    },
];

// TODO: delete those `any` casts. Typescript correctly detects type violations in the functions below.
export const ObjectDeleteButton = ({ user, model, object, onError, removeObject }: DeleteProps) => {
    const services = useServices()!;

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

export const IconDelete = ({ user, model, object, onError, removeObject }: DeleteProps) => {
    const services = useServices()!;

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
    user: User | null | undefined;
    model: string;
    object: MongoObject;
}

export const ObjectEditButton = ({ user, model, object }: EditProps) => {
    const services = useServices()!;
    const models = makeModels(services);
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
    user: User | null | undefined;
    sprint: Sprint;
}

export const AddPostButton = ({ user, sprint }: AddProps) => {
    const services = useServices()!;
    const models = makeModels(services);
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
    onClick: () => void;
}
export const AddCommentButton = ({ user, object, onClick }: AddCommentProps) => {
    return user && object ? (
        <Button color="inherit" href="" onClick={onClick}>
            Add Comment
        </Button>
    ) : null;
};
