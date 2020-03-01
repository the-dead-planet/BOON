import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import commentsService from '../../services/commentsService';
import postsService from '../../services/postsService';
import sprintsService from '../../services/sprintsService';
// import { authenticatedPage } from '../../components/authenticatedPage';
// import { withPush } from '../../utils/routingDecorators';

// const useStyles = makeStyles(theme => ({}));

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

export const ObjectDeleteButton = ({ user, model, object, push, onError }) => {
    // const classes = useStyles();

    return (
        <React.Fragment>
            {user && object && object.author.id === user._id ? (
                <Button
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
                </Button>
            ) : (
                ''
            )}
        </React.Fragment>
    );
};
