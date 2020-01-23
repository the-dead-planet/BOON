import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

// const useStyles = makeStyles(theme => ({}));

export const SprintDetailsContent = ({ _id, body }) => {
    // const classes = useStyles();

    return (
        <Box id={'content'} textAlign="left">
            <Typography variant="body2">{body}</Typography>
        </Box>
    );
};
