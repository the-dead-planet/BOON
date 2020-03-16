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

function SprintListItem({ _id, number, title, dateFrom, dateTo, body, onClick }) {
    const classes = useStyles();

    // var sprintTitle =<Link to={`/sprints/${_id}`}>{number}: {title}</Link>;
    let sprintTitle = <span onClick={onClick}>{title}</span>;

    let sprintDateRange = `${dateFrom ? moment(dateFrom).format(DATE_FORMAT) : null} - ${
        dateTo ? moment(dateTo).format(DATE_FORMAT) : null
    }`;

    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                {/* <ListItemAvatar>
                    <Avatar alt="Remy Sharp" />
                </ListItemAvatar> */}
                <ListItemText
                    className={classes.textColorLight}
                    onClick={onClick}
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
            <Divider variant="inset" component="li" />
        </React.Fragment>
    );
}

export default SprintListItem;
