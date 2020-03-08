import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SprintListItem from './ListItem';
import { Box, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const SprintsList = ({ sprints, onClick }) => {
    const useStyles = makeStyles(theme => ({
        inline: {
            display: 'inline',
        },
        paper: {
            backgroundColor: '#FFF',
            margin: '1% 0'
        },
        offset: {
            padding: '10px',
        },
        root: {
            overflow: 'auto',
            height: '500px',
        },
    }));

    const classes = useStyles();

    return (
        <Box>
            <Paper className={`${classes.paper}`}>
                <Typography variant="h4" className={classes.offset}>Sprints</Typography>
                <List className={classes.root}>
                    {[...sprints]
                        .sort((a, b) => b.number - a.number)
                        .map(sprint => (
                            <SprintListItem {...sprint} key={sprint._id} onClick={() => onClick(sprint._id)} />
                        ))}
                </List>
            </Paper>
        </Box>
    );
};

export default SprintsList;
