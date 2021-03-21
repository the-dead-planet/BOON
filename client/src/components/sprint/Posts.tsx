import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, CardMedia, Typography } from '@material-ui/core';
import Card from '../Card';
import vintageImg1 from '../../img/content/vintage/bus.jpg';
import vintageImg2 from '../../img/content/vintage/car.jpg';
import defaultImg1 from '../../img/content/tech/robot.jpg';
import defaultImg2 from '../../img/content/tech/woman-hologram.jpg';
import frosticImg1 from '../../img/content/tech/teens-video-games.jpg';
import frosticImg2 from '../../img/content/tech/man-and-tech.jpg';
import { User, Post, Project, Comment, Like, PostsListVariant, Col, ThemeType } from '../../logic/types';

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
        media: {
            height: '100px',
            margin: theme.spacing(0, 2),
        },
    })
);

interface Props {
    user: User;
    themeType: ThemeType;
    projects: Map<string, Project>;
    posts: Array<Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    addComment: any;
    removeComment: any;
    removePost: any;
    getCreated?: (a: Date) => string;
    getTag?: (a: string) => string;
    getTagLink?: (a: string) => string;
    quote?: { body: string; author: string };
    toggleCommentsPanel: any;
    xs?: Col;
    sm?: Col;
    md?: Col;
    lg?: Col;
    xl?: Col;
}

export const Posts = ({
    user,
    themeType,
    getCreated,
    getTag,
    getTagLink,
    quote,
    projects,
    posts,
    comments,
    likes,
    users,
    addComment,
    removeComment,
    removePost,
    toggleCommentsPanel,
    ...props
}: Props) => {
    const classes = useStyles();
    const path = useLocation().pathname;

    // Temp:
    const img1 = themeType === 'vintage' ? vintageImg1 : themeType === 'frostic' ? frosticImg1 : defaultImg1;
    const img2 = themeType === 'vintage' ? vintageImg2 : themeType === 'frostic' ? frosticImg2 : defaultImg2;

    return (
        <Grid container justify="space-around" spacing={1}>
            {posts.map((post: Post, i: number) => (
                <Fragment key={i}>
                    <Grid item className={classes.container} {...props}>
                        <Card
                            key={`${post._id}-${i}`}
                            user={user}
                            themeType={themeType}
                            object={post}
                            model={'Post'}
                            comments={post.comments.map((id) => comments.get(id))}
                            likes={post.likes.map((id) => likes.get(id))}
                            author={users.get(post.author as any)?.publicName || 'Unknown user'}
                            title={post.title}
                            titleLink={`/posts/${post._id}?from=`}
                            created={getCreated ? getCreated(post.created) : undefined}
                            tag={{
                                title: getTag ? getTag(post._id) : '',
                                link: getTagLink ? getTagLink(post._id) : '',
                            }}
                            body={post.body}
                            // TODO: if image for post, shorten the 'maxLen' and display image
                            maxLen={i % 3 === 1 ? 250 : 400}
                            mediaMiddle={
                                i % 3 === 1 ? (
                                    <CardMedia image={i % 2 === 0 ? img1 : img2} className={classes.media} />
                                ) : undefined
                            }
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
                            linkBack={{ name: 'sprints', path: path }}
                        />
                    </Grid>

                    {/* Add quote tile in the middle, which takes up more space */}
                    {/* TODO: Prepare a tile for the quote with a vintage image and large text */}
                    {i === 3 && quote ? (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            lg={8}
                            xl={4}
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            className={`${classes.container} ${classes.quoteContainer}`}
                        >
                            <Typography variant="h3" className={classes.quote}>
                                {quote.body}
                            </Typography>
                            <Typography variant="body2" className={classes.quoteAuthor}>
                                ~ {quote.author}
                            </Typography>
                        </Grid>
                    ) : undefined}
                </Fragment>
            ))}
        </Grid>
    );
};
