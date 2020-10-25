import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { JUMBOTRON_HEIGHT, TOOLBAR_HEIGHT } from '../../styles/constants';
import { Link } from '../../utils/Link';
import { Grid, Button, Typography, Hidden, Grow } from '@material-ui/core';
import { Jumbotron as JumbotronProps } from '../../logic/types';
//import * as jumbotronLight from '../../img/landing/JumbotronLight.png';
import { PATHS } from '../../constants/data';
const { main } = PATHS;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        jumbotronImg: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: JUMBOTRON_HEIGHT,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            backgroundColor: '#000', // backgroundImage imported as a component in Layout.tsx
            boxShadow: '0px 2px 4px -1px rgba(0,0, 0.2)',
        },
        jumbotronContent: {
            marginTop: `${TOOLBAR_HEIGHT}px`,
            position: 'absolute',
            color: '#fff',
            height: `calc(${JUMBOTRON_HEIGHT} - ${JUMBOTRON_HEIGHT}px)`,
        },
        offset: {
            margin: '0.5em',
        },
    })
);

const Jumbotron = ({ img = '', title = 'Hello', subtitle = 'Welcome', actions = [], onClick }: JumbotronProps) => {
    const classes = useStyles();
    // TODO: use react-image
    const imgStyle = { backgroundImage: `url(${img})` };

    return (
        <>
            {/* Background image */}
            <div className={classes.jumbotronImg} style={imgStyle} />

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
                                                variant="contained"
                                                color="primary"
                                                className={classes.offset}
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
