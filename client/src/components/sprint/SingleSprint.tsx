import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Posts } from './Posts';
import { SprintOverview } from './SprintOverview';
// import usersService from '../../../services/usersService';
import { User, Sprint, Post, Project, Comment, Like } from '../../logic/types';
import * as AppState from '../../app-state';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            margin: '0 1em',
        },
    })
);

interface Props {
    sprint: Sprint | undefined;
    projects: Map<string, Project>;
    posts: Map<string, Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    toggleSprintComments: (toggle: boolean) => void;
    togglePostComments: (postId: string | null) => void;
}

export const SingleSprint: React.FC<Props> = ({
    sprint,
    posts,
    comments,
    projects,
    likes,
    users,
    togglePostComments,
    toggleSprintComments,
}) => {
    const classes = useStyles();

    const getProject = (id: string) =>
        [...projects.values()]?.reduce((acc, project) => (project.posts.includes(id) ? project : acc));

    return sprint ? (
        <div className={classes.container}>
            <SprintOverview
                sprint={sprint}
                comments={sprint.comments.map((id: string) => comments.get(id))}
                likes={sprint.likes.map((id: string) => likes.get(id))}
                users={users}
                toggleCommentsPanel={toggleSprintComments}
            />
            {/* <Divider className={classes.divider} /> */}
            <Posts
                projects={projects}
                posts={sprint.posts.map((id) => posts.get(id)!)}
                comments={comments}
                likes={likes}
                users={users}
                getTag={(postId: string) => getProject(postId).title}
                getTagLink={(postId: string) => `/projects/${getProject(postId)._id}`}
                quote={{
                    body: "I am not a fan of books. I would never want a book's autograph.",
                    author: 'Kanye West',
                }}
                addComment={(id, comment) => AppState.addCommentToPost(id, comment)}
                removePost={(obj) =>
                    AppState.removeObject({ child: 'posts', childId: obj.objectId, parent: 'sprints', parentId: sprint._id })
                }
                removeComment={(id: string, postId: string) =>
                    AppState.removeObject({ child: 'comments', childId: id, parent: 'posts', parentId: postId })
                }
                toggleCommentsPanel={togglePostComments}
                xs={12}
                md={6}
                lg={4}
                xl={3}
            />
        </div>
    ) : (
        <></>
    );
};
