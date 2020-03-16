import React, { useState, useEffect } from 'react';
import { useStyles } from '../../styles/main';
import SprintListDrawer from './list/ListDrawer';
import { SingleSprint } from './details/SingleSprint';
import { Loading, Empty } from '../Loading';
import sprintsService from '../../services/sprintsService';
import Hidden from '@material-ui/core/Hidden';

const SprintsView = ({ user, onClick, sprintId, initializeSprint, onError }) => {
    const classes = useStyles();

    const [sprints, setSprints] = useState(null);

    const getSprints = async () => {
        // TODO: store `sprints` in `App.js`, pass by props
        let res = await sprintsService.getAll().catch(onError);
        setSprints(res);
        initializeSprint(res);
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
            <Hidden xsDown>
                <SprintListDrawer sprints={sprints} onClick={onClick} />
            </Hidden>

            <main className={`${classes.content}`}>
                <SingleSprint
                    user={user}
                    sprint={sprints.filter(sprint => sprint._id === sprintId)[0]}
                    onError={onError}
                />
            </main>
        </React.Fragment>
    );
};

export default SprintsView;
