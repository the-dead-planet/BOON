import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, CardMedia, Typography } from '@material-ui/core';
import { PostCard } from './Card';
import img from '../../img/landing/landing-1.png';
import { User, Post, Project, Comment, Like } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
        quoteContainer: {
            border: `solid 2px ${theme.palette.primary.main}`,
            position: 'relative',
            '&::after': {
                content: "''",
                position: 'absolute',
                left: theme.spacing(1),
                right: theme.spacing(1),
                top: theme.spacing(1),
                bottom: theme.spacing(1),
                border: `solid 2px ${theme.palette.primary.light}`,
            },
        },
        quote: {
            textAlign: 'center',
            fontStyle: 'italic',
            margin: theme.spacing(2),
        },
        quoteAuthor: {
            margin: theme.spacing(2),
        },
    })
);

interface Props {
    user: User;
    projects: Map<string, Project>;
    posts: Array<Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    addComment: any;
    removeComment: any;
    removePost: any;
    push: any;
    toggleCommentsPanel: any;
}

export const PostsList = ({
    user,
    projects,
    posts,
    comments,
    likes,
    users,
    addComment,
    removeComment,
    removePost,
    push,
    toggleCommentsPanel,
}: Props) => {
    const classes = useStyles();
    const style = { height: '100px', marginLeft: '1.1em', marginRight: '1.1em' };
    const getProject = (id: string) =>
        [...projects.values()]?.reduce((acc, project) => (project.posts.includes(id) ? project : acc));

    return (
        <Grid container spacing={1}>
            {posts.map((post: Post, i: number) => (
                <Fragment key={i}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.container}>
                        <PostCard
                            key={`${post._id}-${i}`}
                            user={user}
                            object={post}
                            model={'Post'}
                            comments={post.comments.map((id) => comments.get(id))}
                            likes={post.likes.map((id) => likes.get(id))}
                            users={users as any}
                            author={users.get(post.author as any)?.publicName || 'Unknown user'}
                            title={post.title}
                            titleLink={`/posts/${post._id}`}
                            // subtitle={moment(post.created).format(EXT_DATE_FORMAT)}
                            subtitle={getProject(post._id).title}
                            subtitleLink={`/projects/${getProject(post._id)._id}`}
                            body={post.body}
                            // TODO: if image for post, shorten the 'maxLen' and display image
                            maxLen={i % 3 === 1 ? 250 : 400}
                            mediaMiddle={i % 3 === 1 && img ? <CardMedia style={style} image={img} /> : undefined}
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
                            addComment={addComment}
                            removeObject={removePost}
                            removeComment={(id: string) => removeComment(id, post._id)}
                            toggleCommentsPanel={toggleCommentsPanel}
                            divider={true}
                            hover={true}
                        />
                    </Grid>

                    {/* Add quote tile in the middle, which takes up more space */}
                    {/* TODO: Prepare a tile for the quote with a vintage image and large text */}
                    {i === 3 && (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={8}
                            lg={6}
                            xl={4}
                            className={`${classes.container} ${classes.quoteContainer}`}
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Typography variant="h3" className={classes.quote}>
                                I am not a fan of books. I would never want a book's autograph.
                            </Typography>
                            <Typography variant="body2" className={classes.quoteAuthor}>
                                ~ Kanye West
                            </Typography>
                        </Grid>
                    )}
                </Fragment>
            ))}
        </Grid>
    );
};
