import React from 'react';
import { useStyles } from '../../../styles/main';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import { DATE_FORMAT } from '../../../utils/constants';
import { Link } from 'react-router-dom';

function DrawerListItem({ _id, number, title, dateFrom, dateTo, body, currentSprintId }) {
    const classes = useStyles();

    let sprintDateRange = `${dateFrom ? moment(dateFrom).format(DATE_FORMAT) : null} - ${
        dateTo ? moment(dateTo).format(DATE_FORMAT) : null
    }`;

    const bgColor = _id === currentSprintId ? classes.bgHoverDarker : null;
    const txColor = classes.textColorLight;

    return (
        <React.Fragment>
            <Link to={`/sprints/${_id}`}>
                <ListItem button className={bgColor} alignItems="flex-start">
                    <ListItemText
                        className={txColor}
                        primary={`No.${number} ${title}`}
                        secondary={
                            <React.Fragment>
                                <Typography className={txColor} component="span" variant="caption">
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
