import React from 'react';
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import { Divider } from '@material-ui/core';
import { Posts } from './Posts';
import { SprintOverview } from './SprintOverview';
// import usersService from '../../../services/usersService';
import { User, Sprint, Post, Project, Comment, Like } from '../../logic/types';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//     })
// );

interface Props {
    user: User | null | undefined;
    sprint: Sprint | undefined;
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

export const SingleSprint = ({
    user,
    sprint,
    posts,
    comments,
    projects,
    likes,
    users,
    addPostComment,
    addSprintComment,
    removeObject,
    toggleCommentsPanel,
    onError,
}: Props) => {
    // const classes = useStyles();

    return sprint ? (
        <>
            <SprintOverview
                user={user}
                sprint={sprint}
                comments={sprint.comments.map((id: string) => comments.get(id))}
                likes={sprint.likes.map((id: string) => likes.get(id))}
                users={users}
                addComment={addSprintComment}
                removeSprint={(id: string) => removeObject({ child: 'sprints', childId: id })}
                removeComment={(id: string) =>
                    removeObject({ child: 'comments', childId: id, parent: 'sprints', parentId: sprint._id })
                }
                toggleCommentsPanel={toggleCommentsPanel}
                onError={onError}
            />
            {/* <Divider className={classes.divider} /> */}
            <Posts
                user={user}
                subtitle="project"
                projects={projects}
                posts={sprint.posts.map((id) => posts.get(id))}
                comments={comments}
                likes={likes}
                users={users}
                addComment={addPostComment}
                removePost={(id: string) =>
                    removeObject({ child: 'posts', childId: id, parent: 'sprints', parentId: sprint._id })
                }
                removeComment={(id: string, postId: string) =>
                    removeObject({ child: 'comments', childId: id, parent: 'posts', parentId: postId })
                }
                toggleCommentsPanel={toggleCommentsPanel}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
            />
        </>
    ) : (
        <></>
    );
};
