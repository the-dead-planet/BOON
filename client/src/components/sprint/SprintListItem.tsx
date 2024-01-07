import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Link } from '../../utils/Link';
import { ListItem, Theme } from '@mui/material';
import { Format } from '../../constants/dateFormats';
import * as Utils from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        selectedStyle: {
            fontStyle: 'italic',
        },
    })
);

interface Props {
    _id: string;
    number: number;
    title: string;
    dateFrom: Date;
    dateTo: Date;
    body: string;
    currentSprintId: string;
}

function SprintListItem({ _id, number, title, dateFrom, dateTo, body, currentSprintId }: Props) {
    const classes = useStyles();

    // const sprintDateRange = `${dateFrom ? Utils.DateTime.toFormat(dateFrom, DATE_FORMAT) : null} - ${
    //     dateTo ? Utils.DateTime.toFormat(dateTo, DATE_FORMAT) : null
    // }`;

    return (
        <React.Fragment>
            <Link to={`/sprints/${_id}`}>
                <ListItem
                    // button
                    className={currentSprintId === _id ? classes.selectedStyle : undefined}
                >
                    {`#${number} ${Utils.DateTime.toFormat(dateTo, Format.MONTH_DATE_FORMAT)}`}
                </ListItem>
            </Link>
        </React.Fragment>
    );
}

export default SprintListItem;
