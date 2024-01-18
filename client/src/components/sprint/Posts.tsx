import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles, createStyles } from '@mui/styles';
import { Grid, CardMedia, Typography, Theme } from '@mui/material';
import Card from '../Card';
import * as Images from '../../img';
import { User, Post, Project, Comment, Like, Col, WithObjectId } from '../../logic/types';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

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
    projects: Map<string, Project>;
    posts: Array<Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    removePost: (obj: WithObjectId) => void;
    getCreated?: (a: Date) => string;
    getTag?: (a: string) => string;
    getTagLink?: (a: string) => string;
    quote?: { body: string; author: string };
    toggleCommentsPanel: (postId: string | null) => void;
    xs?: Col;
    sm?: Col;
    md?: Col;
    lg?: Col;
    xl?: Col;
}

export const Posts = ({
    getCreated,
    getTag,
    getTagLink,
    quote,
    projects,
    posts,
    comments,
    likes,
    users,
    removePost,
    toggleCommentsPanel,
    ...props
}: Props) => {
    const classes = useStyles();
    const path = useLocation().pathname;
    const ui = Hooks.useSubject(AppState.ui$);

    // Temp:
    const img1 = ui.theme === 'vintage' ? `${Images.cmdUrl}/vintage/bus.jpg` : ui.theme === 'frostic' ? `${Images.cmdUrl}/tech/teens-video-games.jpg` : `${Images.cmdUrl}/tech/robot.jpg`;
    const img2 = ui.theme === 'vintage' ? `${Images.cmdUrl}/vintage/car.jpg` : ui.theme === 'frostic' ? `${Images.cmdUrl}/tech/man-and-tech.jpg` : `${Images.cmdUrl}/tech/woman-hologram.jpg`;

    return (
        <Grid container justifyContent="space-around" spacing={1}>
            {posts.map((post: Post, i: number) => (
                <Fragment key={i}>
                    <Grid item className={classes.container} {...props}>
                        <Card
                            key={`${post._id}-${i}`}
                            object={post}
                            model={'Post'}
                            comments={post.comments.map((id) => comments.get(id))}
                            likes={post.likes.map((id) => likes.get(id))}
                            author={'author' in post && post.author ? users.get(post.author._id)?.publicName ?? 'Unknown user' : 'Unknown user'}
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
                                    path: `/projects/${[...projects.entries()]
                                            .filter(([_projectId, proj]) => proj.posts.includes(post._id))
                                            .flat()[0] || ''
                                        }`,
                                },
                            ]}
                            removeObject={removePost}
                            toggleCommentsPanel={(toggle: boolean) => {
                                toggleCommentsPanel(toggle ? post._id : null);
                            }}
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
                            justifyContent="center"
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
