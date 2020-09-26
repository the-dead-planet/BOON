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
                <Box style={{ width: '200px', position: 'absolute' }}>
                    <Typography variant="body2">Sprints</Typography>

                    {sprints ? <SprintList sprints={sprints} currentSprintId={sprintId} /> : null}

                    <Divider variant="middle" className={classes.divider} />

                    <Typography variant="body2">Related projects</Typography>
                    {/* TODO: replace below with a list of projects */}
                    {sprint ? (
                        <ContentsList
                            items={sprint.posts
                                .map((id) => posts.get(id))
                                .map((post) => ({ name: post?.title, path: post?._id }))}
                        />
                    ) : null}

                    <Divider variant="middle" className={classes.divider} />

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
                </Box>
            </Hidden>
            <Box style={{ marginLeft: '200px', top: 0 }}>
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
