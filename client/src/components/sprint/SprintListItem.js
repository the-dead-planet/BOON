import React from 'react';
// import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

function SprintListItem({ _id, number, name, dateFrom, dateTo, description, onClick }) {
    const useStyles = makeStyles(theme => ({
        root: {
            padding: theme.spacing(3, 2),
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        title: {
            fontWeight: 'bold',
        },
    }));

    const classes = useStyles();

    // var sprintTitle =<Link to={`/sprints/${_id}`}>{number}: {name}</Link>;
    var sprintTitle = (
        <span className={classes.title} onClick={onClick}>
            {number}: {name}
        </span>
    );

    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                {/* <ListItemAvatar>
                    <Avatar alt="Remy Sharp" />
                </ListItemAvatar> */}
                <ListItemText
                    onClick={onClick}
                    primary={sprintTitle}
                    secondary={
                        <React.Fragment>
                            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                                {dateFrom ? dateFrom.substring(0, 10) : ''} - {dateTo ? dateTo.substring(0, 10) : ''}
                            </Typography>
                            {description ? description.substring(0, 65) : ''}...
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </React.Fragment>
    );
}

export default SprintListItem;
