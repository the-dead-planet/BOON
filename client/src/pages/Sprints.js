import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import sprintsService from '../services/sprintsService';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import Preview from '../components/sprint/Preview';
import './Sprints.css';



function Sprints(props) {
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
                {/* <Paper className={classes.root}> */}
                <List className={classes.root}>
                    {!sprints ? (
                            <Loading />
                        ) : sprints.length > 0 ? (
                            sprints.map(sprint => <Preview {...sprint} key={sprint._id} />)
                        ) : (
                                    <Typography component="p">No sprints found...</Typography>
                                )}
                </List>
                {/* </Paper> */}
            </Container>
        </div>
    );
}

export default Sprints;
