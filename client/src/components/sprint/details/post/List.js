import React from 'react';
import { useStyles } from '../../../../styles/main';
import List from '@material-ui/core/List';
import CardMedia from '@material-ui/core/CardMedia';
import { PostCard } from './Card';
import moment from 'moment';
import { EXT_DATE_FORMAT } from '../../../../utils/constants';

export const PostsList = ({ user, posts, push }) => {
    const classes = useStyles();

    return (
        <List>
            {(posts || []).map(post => (
                <PostCard
                    key={post._id}
                    user={user}
                    model="Post"
                    title={post.title}
                    subtitle={`${post.author.publicName} / ${moment(post.created).format(EXT_DATE_FORMAT)}`}
                    object={post}
                    mediaMiddle={
                        <CardMedia className={classes.height200} image={require('../../../../img/Landing_1.png')} />
                    }
                    menuItems={[{ name: 'Go to related project' }]}
                />
            ))}
        </List>
    );
};
