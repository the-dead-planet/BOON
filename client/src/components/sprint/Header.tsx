import React from 'react';
import { Typography, Box } from '@mui/material';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants/dateFormats';

interface Props {
    _id: string;
    number: number;
    title: string;
    dateFrom: Date;
    dateTo: Date;
}

export const SprintHeader = ({ _id, number, title, dateFrom, dateTo }: Props) => {
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
