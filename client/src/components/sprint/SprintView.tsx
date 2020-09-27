import React from 'react';
import { useStyles } from '../../styles/main';
import { Box } from '@material-ui/core';
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

const SprintView = (props: Props) => {
    const classes = useStyles();
    const { sprints, sprintId } = props;
    const sprint = sprints ? sprints.get(sprintId) : undefined;

    return !sprints ? (
        <Loading />
    ) : sprints.size === 0 ? (
        <Empty />
    ) : (
        <Box className={classes.mainContent}>
            {/* NOTE: when passing multiple props directly to the child, it's often useful not to unpack them and use the `...` operator */}
            <SingleSprint sprint={sprint} {...props} />
        </Box>
    );
};

export default SprintView;
