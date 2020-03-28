import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import sprintsService from '../services/sprintsService';
import AppLayout from '../layouts/AppLayout';
import SprintView from '../components/sprint/SprintView';
import withShowError from '../components/withShowError';

// If path is /sprints, redirect to the newest sprint
const Sprint = ({ user, sprints, setSprints, notificationsProps, onError, showError }) => {
    const { id } = useParams();
    let _id = id;
    _id = !id && !_id && sprints ? [...sprints].sort((a, b) => new Date(b.dateTo) - new Date(a.dateTo))[0]._id : null;

    const getSprints = async () => {
        let res = await sprintsService.getAll().catch(onError);
        await setSprints(res);
    };

    useEffect(() => {
        if (!sprints) {
            getSprints();
        }
    });

    return id ? (
        <AppLayout user={user} {...notificationsProps}>
            <SprintView user={user} sprints={sprints} sprintId={id} onError={onError} showError={showError} />
        </AppLayout>
    ) : _id ? (
        <Redirect to={`/sprints/${_id}`} />
    ) : null;
};

export default withShowError(Sprint);
