import React from 'react';
import { Typography, Box } from '@material-ui/core';

interface Props {
    _id: string;
    body: string;
}

export const SprintContent = ({ _id, body }: Props) => {
    return (
        <Box id={'content'} textAlign="left">
            <Typography variant="body2">{body}</Typography>
        </Box>
    );
};
