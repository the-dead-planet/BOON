import { Typography, Box } from '@mui/material';
import { Format } from '../../constants/dateFormats';
import * as Utils from '../../utils';

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
                {dateFrom ? Utils.DateTime.toFormat(dateFrom, Format.DATE_FORMAT) : null} -{' '}
                {dateTo ? Utils.DateTime.toFormat(dateTo, Format.DATE_FORMAT) : null}
            </Typography>
        </Box>
    );
};
