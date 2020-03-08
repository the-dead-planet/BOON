import React from 'react';
import { Posts } from './Posts';
import { SprintOverview } from './Overview';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const SingleSprint = ({ user, sprint, onError }) => {
    const useStyles = makeStyles(theme => ({
        inline: {
            display: 'inline',
        },
        paper: {
            backgroundColor: '#FFF',
            margin: '1% 0'
        },
        offset: {
            padding: '10px',
        },
        root: {
            overflow: 'auto',
            height: '580px',
        },
    }));

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <SprintOverview user={user} sprint={sprint} model="Sprint" onError={onError} />
            <Posts user={user} {...sprint} />
        </Box>
    );
};
