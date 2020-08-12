import React from 'react';
import { useStyles } from '../../../styles/main';
import { Link } from '../../../utils/Link';
import { ListItem } from '@material-ui/core';
import moment from 'moment';
import { MONTH_DATE_FORMAT } from '../../../utils/constants';

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

    // const sprintDateRange = `${dateFrom ? moment(dateFrom).format(DATE_FORMAT) : null} - ${
    //     dateTo ? moment(dateTo).format(DATE_FORMAT) : null
    // }`;

    return (
        <React.Fragment>
            <Link to={`/sprints/${_id}`}>
                <ListItem
                    button
                    className={`${currentSprintId === _id && classes.selectedStyle} ${classes.pageNavList}`}
                >
                    {`${number}. ${moment(dateTo).format(MONTH_DATE_FORMAT)}`}
                </ListItem>
            </Link>
        </React.Fragment>
    );
}

export default SprintListItem;
