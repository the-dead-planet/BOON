import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Posts } from './Posts';
import { SprintOverview } from './SprintOverview';
// import usersService from '../../../services/usersService';
import { User, Sprint, Post, Project, Comment, Like } from '../../logic/types';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: '0 1em',
        },
    })
);

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
    const classes = useStyles();

    const getProject = (id: string) =>
        [...projects.values()]?.reduce((acc, project) => (project.posts.includes(id) ? project : acc));

    return sprint ? (
        <div className={classes.container}>
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
                projects={projects}
                posts={sprint.posts.map((id) => posts.get(id))}
                comments={comments}
                likes={likes}
                users={users}
                getTag={(postId: string) => getProject(postId).title}
                getTagLink={(postId: string) => `/projects/${getProject(postId)._id}`}
                quote={{
                    body: "I am not a fan of books. I would never want a book's autograph.",
                    author: 'Kanye West',
                }}
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
                md={6}
                lg={4}
                xl={3}
            />
        </div>
    ) : (
        <></>
    );
};
