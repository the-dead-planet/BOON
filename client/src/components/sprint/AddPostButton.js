import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const AddPostButton = ({ user, sprint }) => {
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
