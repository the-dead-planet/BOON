import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from '../../utils/Link';
import { ListItem } from '@material-ui/core';
import moment from 'moment';
import { MONTH_DATE_FORMAT } from '../../constants/dateFormats';

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

    // const sprintDateRange = `${dateFrom ? moment(dateFrom).format(DATE_FORMAT) : null} - ${
    //     dateTo ? moment(dateTo).format(DATE_FORMAT) : null
    // }`;

    return (
        <React.Fragment>
            <Link to={`/sprints/${_id}`}>
                <ListItem
                    // button
                    className={currentSprintId === _id ? classes.selectedStyle : undefined}
                >
                    {`#${number} ${moment(dateTo).format(MONTH_DATE_FORMAT)}`}
                </ListItem>
            </Link>
        </React.Fragment>
    );
}

export default SprintListItem;
