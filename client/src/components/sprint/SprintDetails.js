import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SprintDetailsHeader } from './SprintDetailsHeader';
import { SprintDetailsContent } from './SprintDetailsContent';
import { SprintDetailsComments } from './SprintDetailsComments';
import { SprintDetailsPosts } from './SprintDetailsPosts';
import { ObjectDeleteButton } from './ObjectDeleteButton';
import { ObjectEditButton } from './ObjectEditButton';
import { AddPostButton } from './AddPostButton';
import { AddPost } from './AddPost';

const useStyles = makeStyles(theme => ({
    paper: { backgroundColor: '#FFF' },
}));

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const SprintDetails = ({ user, sprint, onError }) => {
    const classes = useStyles();

    return (
        // <Paper className={`${classes.paper} ${classes.offset}`}>
        <Box>
            <Paper className={`${classes.paper} ${classes.offset}`}>
                <SprintDetailsHeader {...sprint} />
                <SprintDetailsContent {...sprint} />

                <ObjectDeleteButton user={user} model="Sprint" object={sprint} onError={onError.bind('deleteSprint')} />
                <ObjectEditButton user={user} model="Sprint" object={sprint} />
                <AddPostButton user={user} sprint={sprint} />
                <AddPost user={user} />
            </Paper>

            <Paper className={`${classes.paper} ${classes.offset}`}>
                <SprintDetailsComments user={user} {...sprint} />
            </Paper>

            <Paper className={`${classes.paper} ${classes.offset}`}>
                <SprintDetailsPosts user={user} {...sprint} />
            </Paper>
        </Box>
        // </Paper>
    );
};
