import React from 'react';
import { useStyles } from '../../styles/main';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Loading, Empty } from '../Loading';
import { SingleSprint } from './details/SingleSprint';
import SprintList from './list/List';

const SprintView = ({
    user,
    sprints,
    posts,
    comments,
    likes,
    users,
    sprintId,
    updateStateData,
    onError,
    showError,
}) => {
    const classes = useStyles();
    const sprint = sprints ? sprints.get(sprintId) : undefined;

    return !sprints ? (
        <Loading />
    ) : sprints.length === 0 ? (
        <Empty />
    ) : (
        <Container>
            <div className={classes.toolbar} />
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Hidden xsDown>
                        {sprints ? <SprintList sprints={sprints} currentSprintId={sprintId} /> : null}
                    </Hidden>
                </Grid>

                <Grid item xs={8}>
                    <SingleSprint
                        user={user}
                        sprint={sprint}
                        posts={posts}
                        comments={comments}
                        likes={likes}
                        users={users}
                        updateStateData={updateStateData}
                        onError={onError}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default SprintView;
