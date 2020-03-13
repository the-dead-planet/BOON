import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5%',
        fontSize: '10em',
        color: '#1a1a1d',
    },
}));

export const Loading = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <CircularProgress color="secondary" />
        </Container>
    );
};

export const Empty = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <i className="optin monster icon" href="/" />
            <Typography variant="h5">Oops... No sprints found. Lazy, lazy...</Typography>
        </Container>
    );
};
