import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import sprintsService from '../services/sprintsService';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import { SprintDetails } from '../components/sprint/SprintDetails';
import { useParams } from 'react-router-dom';
import '../styles/main.css';

export const SprintDetail = props => {
    const { user } = props;

    const { id } = useParams();

    const [sprint, setSprint] = useState(null);

    const getSprint = async () => {
        const sprint = await sprintsService.getOne({ objectId: id });
        setSprint(sprint);
    };

    useEffect(() => {
        if (!sprint) {
            getSprint();
        }
    });

    return (
        <React.Fragment>
            <NavBar user={user} />
            <Container className="main">
                <Paper>{!sprint ? <Loading /> : <SprintDetails user={user} {...sprint} />}</Paper>
            </Container>
        </React.Fragment>
    );
};
