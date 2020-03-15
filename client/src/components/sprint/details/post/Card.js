import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { EXT_DATE_FORMAT } from '../../../../utils/constants';
import { Comments } from '../../../Comments';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ActionButtons } from './ActionButtons';
import { CardMenu } from './Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    root: {
        // maxWidth: 345,
        marginBottom: 20,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    paper: {
        backgroundColor: '#FFF',
    },
    right: {
        marginLeft: 'auto',
    },
}));

export const PostCard = ({ user, post }) => {
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
        <Card key={post._id} className={classes.root}>
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
                title={post.title}
                subheader={`${post.author.username} / ${moment(post.created).format(EXT_DATE_FORMAT)}`}
            />
            <CardMenu
                user={user}
                post={post}
                anchorEl={anchorEl}
                handleMenuClose={handleMenuClose}
            />
            {/* <CardMedia
                            className={classes.media}
                            image="/static/images/cards/paella.jpg"
                            title="Paella dish"
                        /> */}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ActionButtons user={user} post={post} handleExpandClick={handleExpandClick} />
            </CardActions>
            <CardContent>
                <Comments expanded={expanded} user={user} model="Post" {...post} />
            </CardContent>
        </Card>
    );
};
