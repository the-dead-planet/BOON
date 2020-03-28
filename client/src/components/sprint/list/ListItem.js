import React from 'react';
import { useStyles } from '../../../styles/main';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import { DATE_FORMAT } from '../../../utils/constants';
import { Link } from 'react-router-dom';

function SprintListItem({ _id, number, title, dateFrom, dateTo, body, onClick }) {
    const classes = useStyles();

    let sprintDateRange = `${dateFrom ? moment(dateFrom).format(DATE_FORMAT) : null} - ${
        dateTo ? moment(dateTo).format(DATE_FORMAT) : null
    }`;

    return (
        <React.Fragment>
            <Link className={classes.noDecoration} to={`/sprints/${_id}`}>
                <ListItem alignItems="flex-start">
                    {/* <ListItemAvatar>
                    <Avatar alt="Remy Sharp" />
                </ListItemAvatar> */}
                    <ListItemText
                        className={classes.textColorLight}
                        primary={`No.${number} ${title}`}
                        secondary={
                            <React.Fragment>
                                <Typography className={classes.textColorLight} component="span" variant="caption">
                                    {sprintDateRange}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </Link>
            <Divider variant="inset" component="li" />
        </React.Fragment>
    );
}

export default SprintListItem;
