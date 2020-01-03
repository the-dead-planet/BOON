import React from 'react';
import { Typography, Box } from '@material-ui/core';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const Detail = ({
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
}) => (
    <Box>
        <Box id={'header'} textAlign="left">
            <Typography variant="h2">
                {number} : {name}
            </Typography>
        </Box>
        <Box id={'content'} textAlign="center">
            <Typography variant="body1">
                {dateFrom} - {dateTo}
            </Typography>
            <Typography variant="body2">{description}</Typography>
        </Box>
        <Box id={'posts'}>{(posts || []).map(post => 'TODO')}</Box>
        <Box id={'comments'}>{(comments || []).map(comment => 'TODO')}</Box>
    </Box>
);
