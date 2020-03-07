import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import moment from 'moment';
import { DATE_FORMAT } from '../../../utils/constants';

// const useStyles = makeStyles(theme => ({}));

export const SprintHeader = ({ _id, number, title, dateFrom, dateTo }) => {
    // const classes = useStyles();

    return (
        <Box id={'header'} textAlign="left">
            <Typography variant="h2">
                {number} : {title}
            </Typography>
            <Typography variant="body1">
                {dateFrom ? moment(dateFrom).format(DATE_FORMAT) : null} -{' '}
                {dateTo ? moment(dateTo).format(DATE_FORMAT) : null}
            </Typography>
        </Box>
    );
};
