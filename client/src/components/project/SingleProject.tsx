import { makeStyles, createStyles } from '@mui/styles';
import { Typography, Slide, Theme } from '@mui/material';
import { Posts } from '../sprint/Posts';
import { Format } from '../../constants/dateFormats';
// import usersService from '../../../services/usersService';
import { User, Post, Project, Comment, Like, Sprint } from '../../logic/types';
import * as Utils from '../../utils';
import * as AppState from '../../app-state';

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
    project: Project;
    projects: Map<string, Project>;
    sprints: Map<string, Sprint>;
    posts: Map<string, Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    toggleCommentsPanel: (projectId: string | null) => void;
}

export const SingleProject = ({
    project,
    sprints,
    posts,
    projects,
    comments,
    likes,
    users,
    toggleCommentsPanel
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
                posts={project.posts
                    .map((id) => posts.get(id)!)
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
                getCreated={(date: Date) => Utils.DateTime.toFormat(date, Format.EXT_DATE_FORMAT)}
                getTag={(postId: string) => `Sprint ${getSprint(postId).number}`}
                getTagLink={(postId: string) => `/sprints/${getSprint(postId)._id}`}
                removePost={(obj) => AppState.removeObject({ child: 'posts', childId: obj.objectId, parent: 'sprints', parentId: project?._id })}
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
