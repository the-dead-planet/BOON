import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { PostCard } from '../sprint/Card';
import moment from 'moment';
import { EXT_DATE_FORMAT } from '../../constants/dateFormats';
// import usersService from '../../../services/usersService';
import { User, Post, Project, Comment, Like, Sprint } from '../../logic/types';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            padding: theme.spacing(8),
            border: `solid 2px ${theme.palette.secondary.main}`,
        },
        main: {
            // borderLeft: `1.2px solid ${theme.palette.primary.main}`,
        },
    })
);

interface Props {
    user: User | null | undefined;
    post: Post | undefined;
    projects: Map<string, Project>;
    sprints: Map<string, Sprint>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    addPostComment: any;
    addSprintComment: any;
    toggleCommentsPanel: any;
    removeObject: any;
    onError: any;
}

export const SinglePost = ({
    user,
    post,
    sprints,
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
    const getSprint = (id: string) =>
        [...sprints.values()]?.reduce((acc, sprint) => (sprint.posts.includes(id) ? sprint : acc));

    const getProject = (id: string) =>
        [...projects.values()]?.reduce((acc, project) => (project.posts.includes(id) ? project : acc));

    return post ? (
        <Container maxWidth="md">
            <PostCard
                user={user}
                object={post}
                model={'Post'}
                comments={post.comments.map((id) => comments.get(id))}
                likes={post.likes.map((id) => likes.get(id))}
                users={users as any}
                author={users.get(post.author as any)?.publicName || 'Unknown user'}
                title={post.title}
                titleLink={`/posts/${post._id}`}
                created={moment(post.created).format(EXT_DATE_FORMAT)}
                tags={[
                    { title: `Sprint ${getSprint(post._id).number}`, link: `/sprints/${getSprint(post._id)._id}` },
                    { title: getProject(post._id).title, link: `/projects/${getProject(post._id)._id}` },
                ]}
                body={post.body}
                menuItems={[
                    {
                        name: 'Go to related project',
                        path: `/projects/${
                            [...projects.entries()]
                                .filter(([projectId, proj]) => proj.posts.includes(post._id))
                                .flat()[0] || ''
                        }`,
                    },
                ]}
                addComment={addPostComment}
                removeObject={(id: string) =>
                    removeObject({ child: 'posts', childId: id, parent: 'sprints', parentId: getSprint(post._id)?._id })
                }
                removeComment={(id: string) =>
                    removeObject({ child: 'comments', childId: id, parent: 'posts', parentId: post._id })
                }
                toggleCommentsPanel={toggleCommentsPanel}
                divider={true}
                hover={true}
                linkBack={{ name: 'Home', path: '/' }}
            />
            {/* TODO: Add list of projects to a side column on the right and remove pagination */}
            {/* TODO: Comments should expand under a post, show 3 by default and add a "show all" button to expand further */}
            {/* TODO: Quote should be only inserted in Sprints */}
        </Container>
    ) : (
        <></>
    );
};
