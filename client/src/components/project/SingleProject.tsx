import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, Slide } from '@material-ui/core';
import { Posts } from '../sprint/Posts';
import moment from 'moment';
import { EXT_DATE_FORMAT } from '../../constants/dateFormats';
// import usersService from '../../../services/usersService';
import { User, Post, Project, Comment, Like, Sprint, ThemeType } from '../../logic/types';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: '0 1em',
        },
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
    themeType: ThemeType;
    project: Project | undefined;
    projects: Map<string, Project>;
    sprints: Map<string, Sprint>;
    posts: Map<string, Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    addPostComment: any;
    toggleCommentsPanel: any;
    removeObject: any;
    onError: any;
}

export const SingleProject = ({
    user,
    themeType,
    project,
    sprints,
    posts,
    projects,
    comments,
    likes,
    users,
    addPostComment,
    removeObject,
    toggleCommentsPanel,
    onError,
}: Props) => {
    const classes = useStyles();
    const getSprint = (id: string) =>
        [...sprints.values()]?.reduce((acc, sprint) => (sprint.posts.includes(id) ? sprint : acc));

    return project ? (
        <div className={classes.container}>
            <Slide in={true} timeout={{ appear: 500, enter: 1000, exit: 500 }} direction="down">
                <Typography variant="h1" color="secondary" className={classes.title}>
                    {project.title}
                </Typography>
            </Slide>
            <Posts
                user={user}
                themeType={themeType}
                posts={project?.posts
                    .map((id) => posts.get(id))
                    .sort((a, b) =>
                        a && b
                            ? getSprint(b._id).number - getSprint(a._id).number
                            : Number(new Date(b?.created || '').getMilliseconds()) -
                              Number(new Date(a?.created || '').getMilliseconds())
                    )}
                projects={projects}
                comments={comments}
                likes={likes}
                users={users}
                getCreated={(date: Date) => moment(date).format(EXT_DATE_FORMAT)}
                getTag={(postId: string) => `Sprint ${getSprint(postId).number}`}
                getTagLink={(postId: string) => `/sprints/${getSprint(postId)._id}`}
                addComment={addPostComment}
                removePost={(id: string) =>
                    removeObject({ child: 'posts', childId: id, parent: 'sprints', parentId: project?._id })
                }
                removeComment={(id: string, postId: string) =>
                    removeObject({ child: 'comments', childId: id, parent: 'posts', parentId: postId })
                }
                toggleCommentsPanel={toggleCommentsPanel}
                xs={12}
                lg={6}
                xl={4}
                // sm={10}
            />
            {/* TODO: Add list of projects to a side column on the right and remove pagination */}
            {/* TODO: Comments should expand under a post, show 3 by default and add a "show all" button to expand further */}
            {/* TODO: Quote should be only inserted in Sprints */}
        </div>
    ) : (
        <></>
    );
};
