import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SprintHeader } from './Header';
import { SprintContent } from './Content';
import { Comments } from '../../Comments';
import { SprintModifyButtons } from './ModifyButtons';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#FFF',
        margin: '1% 0',
    },
    offset: {
        padding: '10px',
    },
    background: {
        backgroundColor: '#ffcb9a',
    },
}));

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const SprintOverview = ({ user, sprint, onError }) => {
    const classes = useStyles();

    return (
        <Box className={classes.background}>
            {/* <Paper className={`${classes.paper}`}> */}
            <SprintHeader {...sprint} />
            <SprintContent {...sprint} />
            <SprintModifyButtons user={user} sprint={sprint} model="Sprint" onError={onError} />
            <Comments user={user} model="Sprint" {...sprint} />
            {/* </Paper> */}
        </Box>
    );
};
