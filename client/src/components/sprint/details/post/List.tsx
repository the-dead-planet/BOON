import React from 'react';
import { useStyles } from '../../../../styles/main';
import List from '@material-ui/core/List';
import CardMedia from '@material-ui/core/CardMedia';
import { PostCard } from './Card';
import moment from 'moment';
import { EXT_DATE_FORMAT, MODELS } from '../../../../utils/constants';
import img from '../../../../img/landing/Landing_1.png';

export const PostsList = ({ user, posts, comments, likes, users, updateStateData, push }) => {
    const classes = useStyles();

    return (
        <List>
            {(posts || []).map((post, index) => (
                <PostCard
                    key={`${post._id}-${index}`}
                    user={user}
                    object={post}
                    model={MODELS.post}
                    comments={post.comments.map(id => comments.get(id))}
                    likes={post.likes.map(id => likes.get(id))}
                    users={users}
                    title={post.title}
                    subtitle={` / ${moment(post.created).format(EXT_DATE_FORMAT)}`}
                    // subtitle={`${users.get(post.author).publicName} / ${moment(post.created).format(EXT_DATE_FORMAT)}`} // TODO: get users from state and filter
                    body={post.body}
                    mediaMiddle={
                        <CardMedia style={{ height: '200px' }} image={img} /> // TODO: read from db
                    }
                    menuItems={[{ name: 'Go to related project' }]}
                    updateStateData={updateStateData}
                />
            ))}
        </List>
    );
};
