import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStyles } from '../../styles/main';
import sprintsService from '../../services/sprintsService';
import Hidden from '@material-ui/core/Hidden';
import { Loading, Empty } from '../Loading';
import { SingleSprint } from './details/SingleSprint';
import SprintListDrawer from './list/ListDrawer';

const SprintView = ({ user, sprints, setSprints, onError, showError }) => {
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

    return !sprints ? (
        <Loading />
    ) : sprints.length === 0 ? (
        <Empty />
    ) : (
        <React.Fragment>
            <Hidden xsDown>{sprints ? <SprintListDrawer sprints={sprints} /> : null}</Hidden>

            <main className={`${classes.content}`}>
                <SingleSprint user={user} sprint={sprints.filter(sprint => id === sprint._id)[0]} onError={onError} />
            </main>
        </React.Fragment>
    );
};

export default SprintView;
