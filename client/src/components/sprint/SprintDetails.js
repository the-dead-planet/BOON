import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SprintDetailsHeader } from './SprintDetailsHeader';
import { SprintDetailsContent } from './SprintDetailsContent';
import { SprintDetailsComments } from './SprintDetailsComments';
import { SprintDetailsPosts } from './SprintDetailsPosts';
import { ObjectDelete } from './ObjectDelete';
import { ObjectEdit } from './ObjectEdit';

const useStyles = makeStyles(theme => ({
    paper: { backgroundColor: '#FFF' },
}));

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const SprintDetails = ({ user, sprint }) => {
    const classes = useStyles();

    return (
        // <Paper className={`${classes.paper} ${classes.offset}`}>
        <Box>
            <Paper className={`${classes.paper} ${classes.offset}`}>
                <SprintDetailsHeader {...sprint} />
                <SprintDetailsContent {...sprint} />

                <ObjectDelete user={user} model="Sprint" object={sprint} />
                <ObjectEdit user={user} model="Sprint" object={sprint} />
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
