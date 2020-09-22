import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import { Button, Hidden, Grid } from '@material-ui/core';
import { Loading, Empty } from '../Loading';
import { SingleSprint } from './details/SingleSprint';
import SprintList from './list/List';
import ContentsList from '../navigation/ContentsList';
import { User, Sprint, Post, Project, Comment, Like } from '../../logic/types';

interface Props {
    user: User | null | undefined;
    sprints: Map<string, Sprint>;
    posts: Map<string, Post>;
    projects: Map<string, Project>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    sprintId: string;
    addPostComment: any;
    addSprintComment: any;
    removeObject: any;
    onError: any;
    showError: any;
}

const SprintView = ({
    user,
    sprints,
    projects,
    posts,
    comments,
    likes,
    users,
    sprintId,
    addPostComment,
    addSprintComment,
    removeObject,
    onError,
    showError,
}: Props) => {
    const classes = useStyles();
    const sprint = sprints ? sprints.get(sprintId) : undefined;

    return !sprints ? (
        <Loading />
    ) : sprints.size === 0 ? (
        <Empty />
    ) : (
        <>
            {/* TODO: Move to a better place */}
            <Grid container justify="center" style={{ width: '100%' }}>
                <Link to="/add_sprint">
                    <Button>Add sprint</Button>
                </Link>
                <Link to="/add_project">
                    <Button>Add project</Button>
                </Link>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Hidden only="xs">
                        {sprints ? <SprintList sprints={sprints} currentSprintId={sprintId} /> : null}
                    </Hidden>
                </Grid>

                <Grid item xs={8}>
                    <SingleSprint
                        user={user}
                        sprint={sprint}
                        projects={projects}
                        posts={posts}
                        comments={comments}
                        likes={likes}
                        users={users}
                        addPostComment={addPostComment}
                        addSprintComment={addSprintComment}
                        removeObject={removeObject}
                        onError={onError}
                    />
                </Grid>

                <Grid item xs={2}>
                    <Hidden only="xs">
                        {sprint ? (
                            <ContentsList
                                items={sprint.posts
                                    .map((id) => posts.get(id))
                                    .map((post) => ({ name: post?.title, path: post?._id }))}
                            />
                        ) : null}
                    </Hidden>
                </Grid>
            </Grid>
        </>
    );
};

export default SprintView;
