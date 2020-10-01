import React from 'react';
import { useStyles } from '../../styles/main';
import { User, Sprint, Post, Project, Comment, Like } from '../../logic/types';
import { Typography, Hidden, Box, Grid, Divider } from '@material-ui/core';
import ContentsList from './ContentsList';
import { Link } from '../../utils/Link';

interface LeftBarProps {
    sprint: Sprint | undefined;
    posts: Map<string, Post>;
}

// A temporary component that is going to be implemented in Layout in the long run.
const LeftBar = ({ sprint, posts }: LeftBarProps) => {
    const classes = useStyles();
    return (
        <Hidden smDown>
            <Box className={classes.sideCol}>
                <Box className={classes.navContainer}>
                    <Typography variant="body2" className={classes.navTitle}>
                        Highlights
                    </Typography>

                    {sprint ? (
                        <ContentsList
                            items={sprint.posts
                                .map((id) => posts.get(id))
                                .map((post) => ({ name: post?.title, path: post?._id }))}
                        />
                    ) : null}

                    <Typography variant="body2" className={classes.navTitle}>
                        Related Projects
                    </Typography>

                    {/* TODO: replace below with a list of projects */}
                    {sprint ? (
                        <ContentsList
                            items={sprint.posts
                                .map((id) => posts.get(id))
                                .map((post) => ({ name: post?.title, path: post?._id }))}
                        />
                    ) : null}

                    {/* {sprints ? <SprintList sprints={sprints} currentSprintId={sprintId} /> : null} */}

                    <Typography variant="body2" className={classes.navTitle}>
                        Add Stuff
                    </Typography>

                    {[
                        { name: 'New sprint', path: '/add_sprint' },
                        { name: 'New project', path: '/add_project' },
                        { name: 'New post', path: '/add_post' },
                    ].map((item, i) => (
                        <Link key={i} to={item.path}>
                            <Typography variant="body2" className={classes.navButton}>
                                {item.name}
                            </Typography>
                        </Link>
                    ))}
                </Box>

                <Box className={classes.gossColContainer}>
                    <Typography variant="h5" className={classes.gossColTitle}>
                        _goss
                    </Typography>
                </Box>
            </Box>
        </Hidden>
    );
};

export default LeftBar;
