import React from 'react';
import { Typography, Box } from '@material-ui/core';

export const SprintContent = ({ _id, body }) => {
    return (
        <Box id={'content'} textAlign="left">
            <Typography variant="body2">{body}</Typography>
        </Box>
    );
};
