import React from 'react';
import { useStyles } from '../../styles/main';
import Hidden from '@material-ui/core/Hidden';
import { Loading, Empty } from '../Loading';
import { SingleSprint } from './details/SingleSprint';
import SprintListDrawer from './list/ListDrawer';

const SprintView = ({ user, sprints, posts, comments, likes, sprintId, onError, showError }) => {
    const classes = useStyles();
    const sprint = sprints ? sprints.get(sprintId) : undefined;

    return !sprints ? (
        <Loading />
    ) : sprints.length === 0 ? (
        <Empty />
    ) : (
        <React.Fragment>
            <Hidden xsDown>{sprints ? <SprintListDrawer sprints={sprints} currentSprintId={sprintId} /> : null}</Hidden>

            <main className={`${classes.content}`}>
                <SingleSprint
                    user={user}
                    sprint={sprint}
                    posts={posts}
                    comments={comments}
                    likes={likes}
                    onError={onError}
                />
            </main>
        </React.Fragment>
    );
};

export default SprintView;
