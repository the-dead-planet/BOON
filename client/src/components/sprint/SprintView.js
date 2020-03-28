import React from 'react';
import { useStyles } from '../../styles/main';
import Hidden from '@material-ui/core/Hidden';
import { Loading, Empty } from '../Loading';
import { SingleSprint } from './details/SingleSprint';
import SprintListDrawer from './list/ListDrawer';

const SprintView = ({ user, sprints, sprintId, onError, showError }) => {
    const classes = useStyles();

    return !sprints ? (
        <Loading />
    ) : sprints.length === 0 ? (
        <Empty />
    ) : (
        <React.Fragment>
            <Hidden xsDown>{sprints ? <SprintListDrawer sprints={sprints} /> : null}</Hidden>

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

export default SprintView;
