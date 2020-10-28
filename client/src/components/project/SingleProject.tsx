import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, Container, Grid } from '@material-ui/core';
import { Posts } from '../sprint/Posts';
// import usersService from '../../../services/usersService';
import { User, Post, Project, Comment, Like } from '../../logic/types';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            margin: theme.spacing(2, 4),
            textAlign: 'right',
        },
        main: {
            // borderLeft: `1.2px solid ${theme.palette.primary.main}`,
        },
    })
);

interface Props {
    user: User | null | undefined;
    project: Project | undefined;
    projects: Map<string, Project>;
    posts: Map<string, Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    addPostComment: any;
    addSprintComment: any;
    toggleCommentsPanel: any;
    removeObject: any;
    onError: any;
}

export const SingleProject = ({
    user,
    project,
    posts,
    projects,
    comments,
    likes,
    users,
    addPostComment,
    addSprintComment,
    removeObject,
    toggleCommentsPanel,
    onError,
}: Props) => {
    const classes = useStyles();

    return project ? (
        <>
            <Posts
                user={user}
                posts={project?.posts.map((id) => posts.get(id))}
                projects={projects}
                comments={comments}
                likes={likes}
                users={users}
                addComment={addPostComment}
                removePost={(id: string) =>
                    removeObject({ child: 'posts', childId: id, parent: 'sprints', parentId: project?._id })
                }
                removeComment={(id: string, postId: string) =>
                    removeObject({ child: 'comments', childId: id, parent: 'posts', parentId: postId })
                }
                toggleCommentsPanel={toggleCommentsPanel}
                xs={12}
                sm={10}
            />
            {/* TODO: Add list of projects to a side column on the right and remove pagination */}
            {/* TODO: Comments should expand under a post, show 3 by default and add a "show all" button to expand further */}
            {/* TODO: Quote should be only inserted in Sprints */}
        </>
    ) : (
        <></>
    );
};
