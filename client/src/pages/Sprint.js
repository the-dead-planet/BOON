import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStyles } from '../styles/main';
import sprintsService from '../services/sprintsService';
import AppLayout from '../layouts/AppLayout';
import SprintView from '../components/sprint/SprintView';
import withShowError from '../components/withShowError';

const Sprint = ({ user, sprints, setSprints, notificationsProps, onError, showError }) => {
    const classes = useStyles();
    const { id } = useParams();

    const getSprints = async () => {
        let res = await sprintsService.getAll().catch(onError);
        setSprints(res);
    };

    useEffect(() => {
        if (!sprints) {
            getSprints();
        }
    });

    return (
        <AppLayout user={user} {...notificationsProps}>
            <SprintView user={user} sprints={sprints} setSprints={setSprints} onError={onError} showError={showError} />
        </AppLayout>
    );
};

export default withShowError(Sprint);
