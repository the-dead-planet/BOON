import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import { Typography, Hidden, Box, Grid, Divider } from '@material-ui/core';
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
            <Hidden smDown>
                <Box className={classes.navContainer}>
                    <Typography variant="body2" className={classes.navTitle}>
                        Highlights
                    </Typography>

                    {/* TODO: replace below with a list of projects */}
                    {sprint ? (
                        <ContentsList
                            items={sprint.posts
                                .map((id) => posts.get(id))
                                .map((post) => ({ name: post?.title, path: post?._id }))}
                        />
                    ) : null}

                    <Typography variant="body2" className={classes.navTitle}>
                        Sprints
                    </Typography>

                    {sprints ? <SprintList sprints={sprints} currentSprintId={sprintId} /> : null}

                    <Typography variant="body2" className={classes.navTitle}>
                        Add Stuff
                    </Typography>

                    {[
                        { name: 'New sprint', path: '/add_sprint' },
                        { name: 'New project', path: '/add_project' },
                        { name: 'New post', path: '/add_post' },
                    ].map((item, i) => (
                        <Link to={item.path}>
                            <Typography variant="body2" className={classes.navButton}>
                                {item.name}
                            </Typography>
                        </Link>
                    ))}
                </Box>
            </Hidden>
            <Box className={classes.mainContent}>
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
            </Box>
        </>
    );
};

export default SprintView;
