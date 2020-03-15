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
import { CardInnerContent } from './CardInnerContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
    root: {
        // maxWidth: 345,
        marginBottom: 20,
    },
    media: {
      height: 140,
    },
}));

export const PostCard = ({ user, model, post }) => {
    const classes = useStyles();


    return (
        <Card key={post._id} className={classes.root}>
            <CardInnerContent 
                user={user} 
                model="Post"
                title={post.title}
                subtitle={`${post.author.username} / ${moment(post.created).format(EXT_DATE_FORMAT)}`}
                object={post} 
                mediaMiddle={<CardMedia className={classes.media} image={require("../../../../img/Landing_1.png")} />}
            />
        </Card>
    );
};
