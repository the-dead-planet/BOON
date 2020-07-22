import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from 'react-router-dom';
import { Box, Grid, Button, Typography, Hidden, Grow } from '@material-ui/core';
import { Jumbotron as JumbotronProps } from '../../logic/types';
//import * as jumbotronLight from '../../img/landing/JumbotronLight.png';
import { PATHS } from '../../constants/data';
const { main } = PATHS;

const Jumbotron = ({ img = '', title = 'Hello', subtitle = 'Welcome', actions = [], onClick }: JumbotronProps) => {
    const classes = useStyles();

    return (
        <>
            {/* Background image */}
            <div className={classes.jumbotronImg} style={{ backgroundImage: `url(${img})` }} />

            {/* Main content */}
            <Grow timeout={2000} in={true}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.jumbotronContent}
                >
                    <Grid item xs={12} md={6} container alignItems="center" direction="column">
                        <Typography variant="h2">{title}</Typography>
                        <Typography variant="h4" gutterBottom>
                            {subtitle}
                        </Typography>

                        <Grid item container justify="center">
                            {actions &&
                                actions.map((action, i) => (
                                    <Grid item key={`item-${i}`}>
                                        <Link to={`${action.path}?next=${main}`}>
                                            <Button
                                                key={`button-${i}`}
                                                style={{ margin: '0.5em' }}
                                                variant="contained"
                                                color="primary"
                                            >
                                                {action.name}
                                            </Button>
                                        </Link>
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>

                    <Hidden smDown>
                        <Grid item md={6}></Grid>
                    </Hidden>
                </Grid>
            </Grow>
        </>
    );
};

export default Jumbotron;
