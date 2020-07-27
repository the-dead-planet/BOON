import React from 'react';
import { useStyles } from '../../../styles/main';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import { DATE_FORMAT, MONTH_DATE_FORMAT } from '../../../utils/constants';
import { Link } from 'react-router-dom';

function SprintListItem({ _id, number, title, dateFrom, dateTo, body, currentSprintId }) {
    const classes = useStyles();

    let sprintDateRange = `${dateFrom ? moment(dateFrom).format(DATE_FORMAT) : null} - ${
        dateTo ? moment(dateTo).format(DATE_FORMAT) : null
    }`;

    let sprintDateToMonth = moment(dateTo).format(MONTH_DATE_FORMAT);

    const selected = _id === currentSprintId ? classes.selected : null;
    const txColor = classes.textColorDark;

    return (
        <React.Fragment>
            <Link to={`/sprints/${_id}`}>
                <ListItem button className={`${txColor} ${selected}`}>
                    {`#${number} / ${sprintDateToMonth}`}
                </ListItem>
            </Link>
        </React.Fragment>
    );
}

export default SprintListItem;
