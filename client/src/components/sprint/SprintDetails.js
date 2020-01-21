import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SprintDetailsHeader } from './SprintDetailsHeader';
import { SprintDetailsContent } from './SprintDetailsContent';
import { SprintDetailsComments } from './SprintDetailsComments';
import { SprintDetailsPosts } from './SprintDetailsPosts';

const useStyles = makeStyles(theme => ({
    rootForm: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '100%',
            margin: '0 auto',
        },
    },
    root: {
        padding: theme.spacing(3, 2),
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    offset: {
        padding: '20px',
    },
}));

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const SprintDetails = ({
    user,
    _id,
    number,
    name,
    dateFrom,
    dateTo,
    description,
    posts,
    comments,
    likes,
    author,
    created,
    push,
}) => {
    const classes = useStyles();

    return (
        <Paper className={`${classes.paper} ${classes.offset}`}>
            <Box>
                <SprintDetailsHeader _id={_id} number={number} name={name} dateFrom={dateFrom} dateTo={dateTo} />

                <SprintDetailsContent _id={_id} description={description} />

                <SprintDetailsComments user={user} _id={_id} comments={comments} push={push} />

                <SprintDetailsPosts user={user} _id={_id} posts={posts} push={push} />
            </Box>
        </Paper>
    );
};
