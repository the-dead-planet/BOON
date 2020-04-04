import React from 'react';
import { useStyles } from '../../../styles/main';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import { DATE_FORMAT } from '../../../utils/constants';
import { Link, useParams } from 'react-router-dom';

function SprintListItem({ _id, number, title, dateFrom, dateTo, body }) {
    const { id } = useParams();
    const classes = useStyles();

    let sprintDateRange = `${dateFrom ? moment(dateFrom).format(DATE_FORMAT) : null} - ${
        dateTo ? moment(dateTo).format(DATE_FORMAT) : null
    }`;

    const bgColor = _id === id ? classes.bgHoverDarker : null;
    // const txColor = _id === id ? classes.textColorDark : classes.textColorLight;
    const txColor = classes.textColorLight;

    return (
        <React.Fragment>
            <Link className={classes.noDecoration} to={`/sprints/${_id}`}>
                <ListItem button className={bgColor} alignItems="flex-start">
                    {/* <ListItemAvatar>
                    <Avatar alt="Remy Sharp" />
                </ListItemAvatar> */}
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
            {/* <Divider variant="inset" component="li" /> */}
        </React.Fragment>
    );
}

export default SprintListItem;
