import React from 'react';
import { useStyles } from '../../styles/main';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Loading, Empty } from '../Loading';
import { SingleSprint } from './details/SingleSprint';
import SprintList from './list/List';
import ContentsList from '../navigation/ContentsList';
import { User, Sprint, Post, Comment, Like } from '../../logic/types';

interface Props {
    user: User | null | undefined;
    sprints: Map<string, Sprint>;
    posts: Map<string, Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    sprintId: string;
    addPostComment: any;
    addSprintComment: any;
    onError: any;
    showError: any;
}

const SprintView = ({
    user,
    sprints,
    posts,
    comments,
    likes,
    users,
    sprintId,
    addPostComment,
    addSprintComment,
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
        <Container>
            <div className={classes.toolbar} />
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
                        posts={posts}
                        comments={comments}
                        likes={likes}
                        users={users}
                        addPostComment={addPostComment}
                        addSprintComment={addSprintComment}
                        onError={onError}
                    />
                </Grid>

                <Grid item xs={2}>
                    <Hidden only="xs">
                        {sprint ? (
                            <ContentsList
                                items={sprint.posts
                                    .map(id => posts.get(id))
                                    .map(post => ({ name: post?.title, path: post?._id }))}
                            />
                        ) : null}
                    </Hidden>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SprintView;
