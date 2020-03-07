import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SprintHeader } from './Header';
import { SprintContent } from './Content';
import { Comments } from '../../Comments';
import { Posts } from './Posts';
import { SprintModifyButtons } from './ModifyButtons';

const useStyles = makeStyles(theme => ({
    paper: { 
        backgroundColor: '#FFF',
        margin: '1% 0'
    },
    offset: {
        padding: '20px',
    },
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
                <Comments user={user} model="Sprint" {...sprint} />
            </Paper>

            <Posts user={user} {...sprint} />

        </Box>
    );
};
