import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from '../../utils/Link';
// import { CommentsSection } from '../CommentsSection';
import { Box, CardContent, CardActions, Typography, Divider } from '@material-ui/core';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ActionButtons } from './ActionButtons';
import { CardMenu } from './CardMenu';
import { User, Comment, Like, MongoObject, Model } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        post: {
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            border: `solid 1px transparent`,
            // borderBottomColor: theme.palette.primary.main,
            // borderRadius: "20px",
            '&$hover': {
                // '&:hover': {
                //     borderColor: theme.palette.primary.light,
                //     backgroundColor: 'rgba(255, 255, 255, .13)',
                // },
            },
        },
        hover: {},
        col: {
            display: 'flex',
            flexDirection: 'column',
        },
        body: {
            textAlign: 'justify',
        },
        signature: {
            marginLeft: 'auto',
            marginTop: theme.spacing(4),
            fontStyle: 'italic',
        },
        action: {
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'flex-end',
        },
        outlined: {
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText,
            padding: '.3em .6em',
            borderRadius: '2px',
            '&:hover': {
                // backgroundColor: theme.palette.secondary.main,
                boxShadow: `1px 1px 2px ${theme.palette.primary.light}`,
            },
        },
        showMore: {
            color: theme.palette.primary.light,
            // opacity: .6,
            padding: '0 .5em',
            '&:hover': {
                color: theme.palette.secondary.main,
                // opacity: .87,
            },
        },
    })
);

interface Props {
    user: User | null | undefined;
    object: MongoObject;
    model: Model;
    comments: Array<Comment | undefined>;
    likes: Array<Like | undefined>;
    users: Map<string, User>;
    author: string;
    title: string;
    titleLink?: string;
    created?: string;
    tag?: string;
    tagLink?: string;
    category?: { _id: string; title: string };
    body: string;
    maxLen?: number;
    mediaTop?: any;
    mediaMiddle?: any;
    menuItems: Array<{ name: string; path: string }>;
    addComment: any;
    removeObject: any;
    removeComment: any;
    toggleCommentsPanel: any;
    divider?: boolean;
    hover?: boolean;
}

// Pass a component to mediaTop or mediaBottom depending on which location it is needed in
export const PostCard = ({
    user,
    object,
    model,
    comments,
    likes,
    users,
    author,
    title,
    titleLink,
    created,
    tag,
    tagLink,
    category,
    body,
    maxLen,
    mediaTop,
    mediaMiddle,
    menuItems,
    addComment,
    removeObject,
    removeComment,
    toggleCommentsPanel,
    divider,
    hover,
}: Props) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // If maxLen not provided, show the whole text
    maxLen = maxLen || body.length;
    const showMoreRequired = body.length > maxLen;

    // If path is provided then wrap in the link component, otherwise display typography only
    const linkWrapper = (component: any, path?: string) => (path ? <Link to={path}>{component}</Link> : component);

    return (
        // TODO: Remove the hover class and reuse it for on panel click
        <Box id={object._id} className={`${classes.post} ${hover ? classes.hover : undefined}`}>
            {mediaTop}

            <CardContent>
                {linkWrapper(<Typography variant="h6">{title}</Typography>, titleLink)}

                {/* Subtitle and tag are optional */}
                {created && (
                    <Typography component="p" variant="caption" gutterBottom>
                        {created}
                    </Typography>
                )}
                {tag &&
                    linkWrapper(
                        <Typography variant="caption" gutterBottom className={classes.outlined}>
                            {tag}
                        </Typography>,
                        tagLink
                    )}
            </CardContent>
            <CardMenu
                user={user}
                object={object}
                model={model}
                anchorEl={anchorEl}
                handleMenuClose={handleMenuClose}
                menuItems={menuItems}
                removeObject={removeObject}
            />

            {mediaMiddle}

            <CardContent className={classes.col}>
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom className={classes.body}>
                    {showMoreRequired ? `${body.substring(0, maxLen)}` : body}
                    {showMoreRequired && titleLink ? (
                        <Link to={titleLink}>
                            ...{' '}
                            <Typography
                                component="span"
                                variant="caption"
                                color="textSecondary"
                                className={classes.showMore}
                            >
                                show more
                            </Typography>
                        </Link>
                    ) : undefined}
                </Typography>

                {/* Add link to go to the author page */}
                <Typography variant="caption" className={classes.signature}>
                    By {author}
                </Typography>
            </CardContent>

            <CardActions disableSpacing className={classes.action}>
                <ActionButtons
                    user={user}
                    author={(object as { author: string })?.author}
                    comments={comments}
                    likes={likes}
                    handleExpandClick={handleExpandClick}
                    toggleCommentsPanel={(open: boolean) =>
                        toggleCommentsPanel(open, title, model, object._id, addComment, removeComment)
                    }
                />
            </CardActions>

            {divider && <Divider variant="middle" />}
            {/* TODO: add a boolean prop to show or hide below. 
                This part of the card can be used in a card which takes full width.
                If several cards in a row are displayed - use the right drawer to display comments
            */}
            {/* <CardContent>
                <CommentsSection
                    expanded={expanded}
                    user={user}
                    object={object}
                    model={model}
                    comments={comments}
                    users={users}
                    addComment={addComment.bind(object._id)}
                    removeComment={(id: string) => removeComment(id, object._id)}
                />
            </CardContent> */}
        </Box>
    );
};
