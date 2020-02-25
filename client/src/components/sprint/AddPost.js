import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import commentsService from '../../services/commentsService';
// import postsService from '../../services/postsService';
// import sprintsService from '../../services/sprintsService';
// import { authenticatedPage } from '../../components/authenticatedPage';
// import { withPush } from '../../utils/routingDecorators';

// const useStyles = makeStyles(theme => ({}));

export const AddPost = ({ user, sprint }) => {
    // const classes = useStyles();

    return (
        <React.Fragment>
            {user && sprint ? (
                <Button color="inherit" href={`sprints/${sprint._id}/add_post`}>
                    Add Post
                </Button>
            ) : (
                ''
            )}
        </React.Fragment>
    );
};
