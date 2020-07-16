import React from 'react';
import { useStyles } from '../../../../styles/main';
import { CommentsSection } from '../../../CommentsSection';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ActionButtons } from './ActionButtons';
import { CardMenu } from './Menu';
import { User, Comment, Like, MongoObject, Model } from '../../../../logic/types';

interface Props {
    user: User;
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
    updateStateData: any;
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
    updateStateData,
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

    return (
        <Card style={{ marginBottom: "20px" }}>
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
            />
            {mediaMiddle}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ActionButtons user={user} comments={comments} likes={likes} handleExpandClick={handleExpandClick} />
            </CardActions>
            <CardContent>
                <CommentsSection
                    expanded={expanded}
                    user={user}
                    object={object}
                    model={model}
                    comments={comments}
                    users={users}
                    updateStateData={updateStateData}
                />
            </CardContent>
        </Card>
    );
};
