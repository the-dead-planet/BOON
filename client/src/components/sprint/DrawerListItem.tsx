import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import { DATE_FORMAT } from '../../utils/constants';

interface Props {
    _id: string;
    number: number;
    title: string;
    dateFrom: Date;
    dateTo: Date;
    body: string;
    currentSprintId: string;
}

function DrawerListItem({ _id, number, title, dateFrom, dateTo, body, currentSprintId }: Props) {
    const classes = useStyles();

    let sprintDateRange = `${dateFrom ? moment(dateFrom).format(DATE_FORMAT) : null} - ${
        dateTo ? moment(dateTo).format(DATE_FORMAT) : null
    }`;

    return (
        <React.Fragment>
            <Link to={`/sprints/${_id}`}>
                <ListItem button className={_id === currentSprintId ? classes.bold : undefined} alignItems="flex-start">
                    <ListItemText
                        primary={`No.${number} ${title}`}
                        secondary={
                            <React.Fragment>
                                <Typography color="inherit" component="span" variant="caption">
                                    {sprintDateRange}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </Link>
        </React.Fragment>
    );
}

export default DrawerListItem;
