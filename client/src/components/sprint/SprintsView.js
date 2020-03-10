import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import SprintList from './list/List';
import { SingleSprint } from './details/SingleSprint';
import Loading from '../Loading';
import Typography from '@material-ui/core/Typography';
import '../../styles/main.css';
import sprintsService from '../../services/sprintsService';

const SprintsView = props => {
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

    const [sprints, setSprints] = useState(null);

    const getSprints = async () => {
        // TODO: store `sprints` in `App.js`, pass by props
        let res = await sprintsService.getAll().catch(props.onError);
        setSprints(res);
        props.initializeSprint(res);
    };

    useEffect(() => {
        if (!sprints) {
            getSprints();
        }
    });

    // TODO: fix the sprint list to the left side of the screen / use drawers? repair scrolling
    return (
        <Container maxWidth="lg" className="offset-top">
            {!sprints ? (
                <Paper className={classes.paper}>
                    <Loading />
                </Paper>
            ) : sprints.length === 0 ? (
                <Paper className={classes.paper}>
                    <Typography component="p">No sprints found...</Typography>
                </Paper>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} lg={4}>
                        <SprintList sprints={sprints} onClick={props.onClick} />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={8}>
                        <SingleSprint
                            user={props.user}
                            sprint={sprints.filter(sprint => sprint._id === props.sprintId)[0]}
                            onError={props.onError}
                        />
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default SprintsView;
