import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../Loading';
import Preview from '../sprint/Preview';


const SprintList = ({sprints}) => {
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
    }));

    const classes = useStyles();


    return (
        <List className={classes.root}>
            {!sprints ? (
                <Loading />
            ) : sprints.length > 0 ? (
                sprints.map(sprint => <Preview {...sprint} key={sprint._id} />)
            ) : (
                        <Typography component="p">No sprints found...</Typography>
                    )}
        </List>
    );
}

export default SprintList;
