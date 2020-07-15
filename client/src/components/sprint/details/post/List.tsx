import React from 'react';
import { useStyles } from '../../../../styles/main';
import List from '@material-ui/core/List';
import CardMedia from '@material-ui/core/CardMedia';
import { PostCard } from './Card';
import moment from 'moment';
import { EXT_DATE_FORMAT } from '../../../../utils/constants';
import img from '../../../../img/landing/landing_1.png';
import { User, Post, Comment, Like } from '../../../../logic/types';

interface Props {
    user: User;
    posts: Array<Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Array<User>;
    updateStateData: any;
    push: any;
}
export const PostsList = ({ user, posts, comments, likes, users, updateStateData, push }: Props) => {
    const classes = useStyles();

    return (
        <List>
            {(posts || []).map((post: Post, index: number) => (
                <PostCard
                    key={`${post._id}-${index}`}
                    user={user}
                    object={post}
                    model={'Post'}
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
                    menuItems={[{ name: 'Go to related project', path: '/' }]}
                    updateStateData={updateStateData}
                />
            ))}
        </List>
    );
};
