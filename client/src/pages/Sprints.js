import React, { useState, useEffect, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import NavBar from '../components/NavBar';
import SprintList from '../components/sprint/SprintList';
import { Detail } from '../components/sprint/Detail';
import sprintsService from '../services/sprintsService';
import './Sprints.css';
import Loading from '../components/Loading';
import Preview from '../components/sprint/Preview';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';


const Sprints = (props) => {
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
        let res = await sprintsService.getAll();
        setSprints(res);
    };

    useEffect(() => {
        if (!sprints) {
            getSprints();
        }
    });

    

    return (
        <div>
            <NavBar user={props.user} />
            <Container maxWidth="lg" className="main">
                <div className="">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} lg={4}>
                            <SprintList sprints={sprints} />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={8}>
                            <Paper className={classes.paper}>
                            {!sprints ? (
                                    <Loading />
                                ) : sprints.length > 0 ? (
                                    <Detail {...sprints[props.index]}  />
                                ) : (
                                            <Typography component="p">No sprints found...</Typography>
                                        )}
                                
                            </Paper>

                        </Grid>

                    </Grid>
                </div>

            </Container>
        </div>
    );
}

export default Sprints;
