import React from 'react';
import List from '@material-ui/core/List';
import { Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { EXT_DATE_FORMAT } from '../../../utils/constants';
import { ObjectDeleteButton } from '../../Buttons';
import { Comments } from '../../Comments';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';

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

export const PostsList = ({ user, posts, push }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <List>
            {(posts || []).map((post, index) => (
                <Box key={index}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={null}
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={post.title}
                            subheader={`${post.author.username} / ${moment(post.created).format(EXT_DATE_FORMAT)}`}
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
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            {/* <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton> */}
                            <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                                <ModeCommentOutlinedIcon />
                                <Typography variant="caption">{post.comments.length}</Typography>
                            </IconButton>

                            <IconButton className={classes.right}>
                                <ObjectDeleteButton user={user} model="Post" object={post} />
                            </IconButton>
                        </CardActions>
                        <CardContent>
                            <Comments expanded={expanded} user={user} model="Post" {...post} />
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </List>
    );
};
