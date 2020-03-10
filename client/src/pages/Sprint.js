import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import sprintsService from '../services/sprintsService';
import AppLayout from '../layouts/AppLayout';
import Loading from '../components/Loading';
import { SingleSprint } from '../components/sprint/details/SingleSprint';
import { useParams } from 'react-router-dom';
import '../styles/main.css';
import withShowError from '../components/withShowError';

const Sprint = props => {
    const { user, notificationsProps, showError } = props;

    const { id } = useParams();

    const [sprint, setSprint] = useState(null);

    const getSprint = async () => {
        const sprint = await sprintsService.getOne({ objectId: id }).catch(showError);
        setSprint(sprint);
    };

    useEffect(() => {
        if (!sprint) {
            getSprint();
        }
    });

    return (
        <AppLayout user={user} {...notificationsProps}>
            <Container className="main">
                <Paper>{!sprint ? <Loading /> : <SingleSprint user={user} {...sprint} />}</Paper>
            </Container>
        </AppLayout>
    );
};

export default withShowError(Sprint);
