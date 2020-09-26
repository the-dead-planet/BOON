import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import { Typography, Hidden, Grid, Divider } from '@material-ui/core';
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
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Hidden smDown>
                        {sprints ? <SprintList sprints={sprints} currentSprintId={sprintId} /> : null}
                        <Divider className={classes.divider} />
                        {[
                            { name: 'Add sprint', path: '/add_sprint' },
                            { name: 'Add project', path: '/add_project' },
                            { name: 'Add post', path: '/add_post' },
                        ].map((item, i) => (
                            <Link to={item.path}>
                                <Typography variant="body2" className={classes.navButton}>
                                    {item.name}
                                </Typography>
                            </Link>
                        ))}
                    </Hidden>
                </Grid>

                {/* <Divider orientation="vertical" flexItem className={classes.divider} /> */}

                <Grid item xs={12} md={8}>
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
                    <Hidden smDown>
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
