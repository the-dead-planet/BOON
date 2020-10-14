import React from 'react';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
// import { CommentsSection } from '../CommentsSection';
import { Box, Button, CardContent, CardActions, Typography, Divider } from '@material-ui/core';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ActionButtons } from './ActionButtons';
import { CardMenu } from './CardMenu';
import { User, Comment, Like, MongoObject, Model } from '../../logic/types';

interface Props {
    user: User | null | undefined;
    object: MongoObject;
    model: Model;
    comments: Array<Comment | undefined>;
    likes: Array<Like | undefined>;
    users: Map<string, User>;
    author: string;
    title: string;
    titleLink?: string; // path on title click
    subtitle: string;
    subtitleLink?: string; // path on subtitle click
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
    subtitle,
    subtitleLink,
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

    const style = { marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' };

    // If path is provided then wrap in the link component, otherwise display typography only
    const linkWrapper = (component: any, path?: string) => (path ? <Link to={path}>{component}</Link> : component);

    return (
        <Box id={object._id} className={`${classes.post} ${hover ? classes.hover : undefined}`}>
            {mediaTop}

            <CardContent>
                {linkWrapper(<Typography variant="h6">{title}</Typography>, titleLink)}
                {linkWrapper(
                    <Typography variant="caption" gutterBottom>
                        {subtitle}
                    </Typography>,
                    subtitleLink
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
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gutterBottom
                    className={classes.postBody}
                >
                    {showMoreRequired ? `${body.substring(0, maxLen)}` : body}
                    {showMoreRequired && titleLink ? <Link to={titleLink}>...</Link> : undefined}
                </Typography>

                {/* Add link to go to the author page */}
                <Typography variant="caption" className={classes.signature}>
                    By {author}
                </Typography>
            </CardContent>

            <CardActions disableSpacing style={style}>
                <div>
                    <ActionButtons
                        comments={comments}
                        likes={likes}
                        handleExpandClick={handleExpandClick}
                        toggleCommentsPanel={(open: boolean) =>
                            toggleCommentsPanel(open, title, model, object._id, addComment, removeComment)
                        }
                    />
                </div>
            </CardActions>

            {divider && <Divider variant="middle" className={classes.divider} />}
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

            {/* <Divider /> */}
        </Box>
    );
};
