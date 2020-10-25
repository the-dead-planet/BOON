import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, LinearProgress, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loading: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '5%',
            fontSize: '10em',
            color: theme.palette.primary.light,
        },
    })
);

export const Loading = () => {
    const classes = useStyles();

    return (
        <Container className={classes.loading}>
            <CircularProgress color="secondary" />
        </Container>
    );
};

export const Empty = () => {
    const classes = useStyles();

    return (
        <Container className={classes.loading}>
            <Grid container direction="column" alignItems="center">
                <Grid item>
                    <i className="optin monster icon" />
                </Grid>
                <Grid item>
                    <Typography variant="h5">Oops... No sprints found. Lazy, lazy...</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export const LinearBuffer = () => {
    // const classes = useStyles();
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);

    const progressRef = React.useRef(() => {});
    React.useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    });

    React.useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const style = { width: '100%', paddingTop: '2.5em' };

    return (
        <div style={style}>
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="secondary" />
        </div>
    );
};
