import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SprintHeader } from './Header';
import { SprintContent } from './Content';
import { SprintComments } from './Comments';
import { SprintPosts } from './Posts';
import { SprintModifyButtons } from './ModifyButtons';

const useStyles = makeStyles(theme => ({
    paper: { backgroundColor: '#FFF' },
}));

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const SingleSprint = ({ user, sprint, onError }) => {
    const classes = useStyles();

    return (
        <Box>
            <Paper className={`${classes.paper} ${classes.offset}`}>
                <SprintHeader {...sprint} />
                <SprintContent {...sprint} />
                <SprintModifyButtons user={user} sprint={sprint} model="Sprint" onError={onError} />
            </Paper>

            <Paper className={`${classes.paper} ${classes.offset}`}>
                <SprintComments user={user} {...sprint} />
            </Paper>

            <Paper className={`${classes.paper} ${classes.offset}`}>
                <SprintPosts user={user} {...sprint} />
            </Paper>
        </Box>
    );
};
