import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Container, Typography, Grid, LinearProgress, CircularProgress, Theme } from '@mui/material';

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
            color: theme.palette.text.secondary,
        },
        linear: {
            width: '100%',
            paddingTop: theme.spacing(5),
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
                    <Typography variant="h5">Oops... nothing here...</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export const LinearBuffer = () => {
    const classes = useStyles();

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

    return (
        <div className={classes.linear}>
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="secondary" />
        </div>
    );
};
