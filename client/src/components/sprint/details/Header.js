import React from 'react';
import { Typography, Box } from '@material-ui/core';
import moment from 'moment';
import { DATE_FORMAT } from '../../../utils/constants';

export const SprintHeader = ({ _id, number, title, dateFrom, dateTo }) => {
    return (
        <Box id={'header'} textAlign="left">
            <Typography variant="h4">
                {number} : {title}
            </Typography>
            <Typography variant="body1">
                {dateFrom ? moment(dateFrom).format(DATE_FORMAT) : null} -{' '}
                {dateTo ? moment(dateTo).format(DATE_FORMAT) : null}
            </Typography>
        </Box>
    );
};
