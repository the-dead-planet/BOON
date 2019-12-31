import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import sprintsService from '../services/sprintsService';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import './Sprints.css';

function Sprints(props) {

    const useStyles = makeStyles(theme => ({
        root: {
            padding: theme.spacing(3, 2),
        },
    }));

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

    const classes = useStyles();

    return (
        <div>
            <NavBar user={props.user} />
            <Container maxWidth="lg" className="main">
                <Paper className={classes.root}>
                    {!sprints ? (
                        <Loading />
                    ) : (
                            sprints.length > 0 ? (
                                sprints.map(sprint => (
                                    <div key={sprint._id} style={{ color: '#000' }}>
                                        <Typography variant="h5" component="h3">
                                            {sprint.name}
                                        </Typography>
                                        <Typography component="p">
                                            {/* {sprint.dateFrom.toISOString().slice(0,10)} - {sprint.dateTo} */}
                                            {sprint.dateFrom} - {sprint.dateTo}
                                        </Typography>
                                    </div>
                                ))
                            ) : (
                                    <Typography component="p">
                                        No sprints found...
                                    </Typography>
                                )
                        )}
                </Paper>
            </Container>
        </div>
    );
}

export default Sprints;
