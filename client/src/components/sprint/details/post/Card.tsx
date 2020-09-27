import React from 'react';
import { useStyles } from '../../../../styles/main';
import { Link } from '../../../../utils/Link';
import { CommentsSection } from '../../../CommentsSection';
import { Box, Card, CardHeader, CardContent, CardActions, IconButton, Typography, Divider } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ActionButtons } from './ActionButtons';
import { CardMenu } from './Menu';
import { User, Comment, Like, MongoObject, Model } from '../../../../logic/types';

interface Props {
    user: User | null | undefined;
    object: MongoObject;
    model: Model;
    comments: Array<Comment | undefined>;
    likes: Array<Like | undefined>;
    users: Map<string, User>;
    title: string;
    subtitle: string;
    body: string;
    maxLen?: number;
    mediaTop?: any;
    mediaMiddle?: any;
    menuItems: Array<{ name: string; path: string }>;
    addComment: any;
    removeObject: any;
    removeComment: any;
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
    title,
    subtitle,
    body,
    maxLen,
    mediaTop,
    mediaMiddle,
    menuItems,
    addComment,
    removeObject,
    removeComment,
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

    return (
        <Box id={object._id} className={`${classes.post} ${hover ? classes.hover : undefined}`}>
            {mediaTop}
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="caption">{subtitle}</Typography>
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
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {showMoreRequired ? `${body.substring(0, maxLen)}...` : body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={{ marginTop: 'auto' }}>
                <ActionButtons comments={comments} likes={likes} handleExpandClick={handleExpandClick} />
                {/* TODO: Create a single post page */}
                {showMoreRequired && (
                    <Typography variant="caption" className={`${classes.navButton} ${classes.flexRight}`}>
                        <Link to={`/posts/${object._id}`}>Show more...</Link>
                    </Typography>
                )}
            </CardActions>
            {divider && <Divider variant="middle" className={classes.divider} />}
            {/* TODO: on click show dialog window on the right with the list of related comments */}
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
