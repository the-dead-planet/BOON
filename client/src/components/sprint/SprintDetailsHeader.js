import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

export const SprintDetailsHeader = ({ _id, number, title, dateFrom, dateTo }) => {
    const classes = useStyles();

    return (
        <Box id={'header'} textAlign="left">
            <Typography variant="h2">
                {number} : {title}
            </Typography>
            <Typography variant="body1">
                {dateFrom ? dateFrom.substring(0, 10) : ''} - {dateTo ? dateTo.substring(0, 10) : ''}
            </Typography>
        </Box>
    );
};
