import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from '../../utils/Link';
// import { CommentsSection } from '../CommentsSection';
import { Box, CardContent, CardActions, Typography, Divider } from '@material-ui/core';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ActionButtons } from './ActionButtons';
import { CardMenu } from './CardMenu';
import { User, Comment, Like, MongoObject, Model, Tag, ThemeType } from '../../logic/types';

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
            marginRight: theme.spacing(1),
            padding: '.3em .6em',
            borderRadius: '2px',
            '&:hover': {
                // backgroundColor: theme.palette.secondary.main,
                boxShadow: `1px 1px 2px rgba(0, 0, 0, .4)`,
            },
        },
        showMore: {
            // color: theme.palette.primary.light,
            opacity: 0.6,
            fontStyle: 'italic',
            padding: '0 .5em',
            '&:hover': {
                color: theme.palette.secondary.main,
                opacity: 0.87,
            },
        },
        tagsContainer: {
            display: 'flex',
            marginTop: '1em',
        },
        shine: {},
    })
);

interface Props {
    user: User | null | undefined;
    themeType: ThemeType;
    object: MongoObject;
    model: Model;
    comments: Array<Comment | undefined>;
    likes: Array<Like | undefined>;
    author: string;
    title: string;
    titleLink?: string;
    created?: string;
    tags?: Array<Tag>;
    tag?: Tag;
    body: string;
    maxLen?: number;
    mediaTop?: any;
    mediaMiddle?: any;
    menuItems: Array<{ name: string; path: string }>;
    removeObject: any;
    toggleCommentsPanel: (toggle: boolean) => void;
    divider?: boolean;
    hover?: boolean;
    colCount?: number;
    linkBack: { name: string; path: string };
    frosticNoRound?: boolean;
    toggleShine?: boolean;
}

// Pass a component to mediaTop or mediaBottom depending on which location it is needed in
export const Card = ({
    user,
    themeType,
    object,
    model,
    comments,
    likes,
    author,
    title,
    titleLink,
    created,
    tags,
    tag,
    body,
    maxLen,
    mediaTop,
    mediaMiddle,
    menuItems,
    removeObject,
    toggleCommentsPanel,
    divider,
    hover,
    colCount,
    linkBack,
    frosticNoRound,
    toggleShine,
}: Props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };

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
        <Box
            id={object._id}
            className={clsx(classes.post, {
                [classes.hover]: hover,
                frostic: themeType === 'frostic',
                rounded: themeType === 'frostic' && !frosticNoRound,
                [classes.shine]: toggleShine,
            })}
        >
            {mediaTop}

            <CardContent>
                {linkWrapper(<Typography variant="h6">{title}</Typography>, `${titleLink}${linkBack.path}`)}

                {/* Subtitle and tag are optional */}
                {created && (
                    <Typography component="p" variant="caption">
                        {created}
                    </Typography>
                )}

                {/* Tags can be passed either as an array or single tag */}
                {tag && (
                    <div className={classes.tagsContainer}>
                        {linkWrapper(
                            <Typography variant="caption" className={classes.outlined}>
                                {tag.title}
                            </Typography>,
                            tag.link
                        )}
                    </div>
                )}

                {tags && (
                    <div className={classes.tagsContainer}>
                        {tags.map((tag, i) => (
                            <div key={i}>
                                {linkWrapper(
                                    <Typography variant="caption" className={classes.outlined}>
                                        {tag.title}
                                    </Typography>,
                                    tag.link
                                )}
                            </div>
                        ))}
                    </div>
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

            <CardContent className={classes.col} style={{ columnCount: colCount }}>
                <Typography variant="body2" component="p" gutterBottom className={classes.body}>
                    {showMoreRequired ? `${body.substring(0, maxLen)}` : body}
                    {showMoreRequired && titleLink ? (
                        <Link to={`${titleLink}${linkBack.path}`}>
                            ...{' '}
                            <Typography component="span" variant="caption" className={classes.showMore}>
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

            <CardActions
                disableSpacing
                className={clsx(classes.action, {
                    // "frostic": themeType === 'frostic',
                    // "rounded": themeType === 'frostic' && !frosticNoRound
                })}
            >
                <ActionButtons
                    user={user}
                    author={(object as { author: string })?.author}
                    comments={comments}
                    likes={likes}
                    toggleCommentsPanel={toggleCommentsPanel}
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
