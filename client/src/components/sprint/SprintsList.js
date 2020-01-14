import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SprintListItem from './SprintListItem';

const SprintsList = ({ sprints, onClick }) => {
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
            <h1>Sprints</h1>
            {[...sprints]
                .sort((a, b) => b.number - a.number)
                .map(sprint => (
                    <SprintListItem {...sprint} key={sprint._id} onClick={() => onClick(sprint._id)} />
                ))}
        </List>
    );
};

export default SprintsList;
