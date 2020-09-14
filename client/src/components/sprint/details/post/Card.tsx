import React from 'react';
import { useStyles } from '../../../../styles/main';
import { CommentsSection } from '../../../CommentsSection';
import { Card, CardHeader, CardContent, CardActions, IconButton, Typography } from '@material-ui/core';
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
    mediaTop?: any;
    mediaMiddle?: any;
    menuItems: Array<{ name: string; path: string }>;
    addComment: any;
    removeObject: any;
    removeComment: any;
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
    mediaTop,
    mediaMiddle,
    menuItems,
    addComment,
    removeObject,
    removeComment,
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

    const style = { marginBottom: '20px' };

    return (
        <Card id={object._id} style={style}>
            {mediaTop}
            <CardHeader
                avatar={null}
                action={
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleMenuClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
                subheader={subtitle}
            />
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
                    {body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ActionButtons comments={comments} likes={likes} handleExpandClick={handleExpandClick} />
            </CardActions>
            <CardContent>
                <CommentsSection
                    expanded={expanded}
                    user={user}
                    object={object}
                    model={model}
                    comments={comments}
                    users={users}
                    addComment={addComment.bind(object._id)}
                    removeComment={removeComment}
                />
            </CardContent>
        </Card>
    );
};
