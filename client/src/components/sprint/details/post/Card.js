import React from 'react';
import { useStyles } from '../../../../styles/main';
import { Comments } from '../../../Comments';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ActionButtons } from './ActionButtons';
import { CardMenu } from './Menu';

// Pass a component to mediaTop or mediaBottom depending on which location it is needed in
export const PostCard = ({ user, model, object, title, subtitle, mediaTop, mediaMiddle, menuItems }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.bottom20}>
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
                model={model}
                object={object}
                anchorEl={anchorEl}
                handleMenuClose={handleMenuClose}
                menuItems={menuItems}
            />
            {mediaMiddle}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {object.body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ActionButtons user={user} object={object} handleExpandClick={handleExpandClick} />
            </CardActions>
            <CardContent>
                <Comments expanded={expanded} user={user} model={model} {...object} />
            </CardContent>
        </Card>
    );
};
