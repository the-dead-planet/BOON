import React from 'react';
import { useStyles } from '../../../../styles/main';
import moment from 'moment';
import { EXT_DATE_FORMAT } from '../../../../utils/constants';
import Card from '@material-ui/core/Card';
import { CardInnerContent } from './CardInnerContent';
import CardMedia from '@material-ui/core/CardMedia';

export const PostCard = ({ user, model, post }) => {
    const classes = useStyles();

    return (
        <Card key={post._id} className={classes.bottom20}>
            <CardInnerContent
                user={user}
                model="Post"
                title={post.title}
                subtitle={`${post.author.username} / ${moment(post.created).format(EXT_DATE_FORMAT)}`}
                object={post}
                mediaMiddle={
                    <CardMedia className={classes.height200} image={require('../../../../img/Landing_1.png')} />
                }
            />
        </Card>
    );
};
