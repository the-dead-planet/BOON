import React from 'react';
import { useStyles } from '../../../../styles/main';
import List from '@material-ui/core/List';
import CardMedia from '@material-ui/core/CardMedia';
import { PostCard } from './Card';
import moment from 'moment';
import { EXT_DATE_FORMAT } from '../../../../utils/constants';

export const PostsList = ({ user, posts, comments, likes, authors, push }) => {
    const classes = useStyles();

    return (
        <List>
            {(posts || []).map((post, index) => (
                <PostCard
                    key={`${post._id}-${index}`}
                    user={user}
                    object={post}
                    model="Post"
                    comments={post.comments.map(id => comments.get(id))}
                    likes={post.likes.map(id => likes.get(id))}
                    authors={authors}
                    title={post.title}
                    subtitle={` / ${moment(post.created).format(EXT_DATE_FORMAT)}`}
                    subtitle={`${authors.get(post.author).publicName} / ${moment(post.created).format(
                        EXT_DATE_FORMAT
                    )}`} // TODO: get authors from state and filter
                    body={post.body}
                    mediaMiddle={
                        <CardMedia className={classes.height200} image={require('../../../../img/Landing_1.png')} />
                    }
                    menuItems={[{ name: 'Go to related project' }]}
                />
            ))}
        </List>
    );
};
