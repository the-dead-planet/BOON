import React from 'react';
import { useStyles } from '../../../../styles/main';
import List from '@material-ui/core/List';
import CardMedia from '@material-ui/core/CardMedia';
import { PostCard } from './Card';
import moment from 'moment';
import { EXT_DATE_FORMAT } from '../../../../utils/constants';
import img from '../../../../img/landing/landing-1.png';
import { User, Post, Project, Comment, Like } from '../../../../logic/types';

interface Props {
    user: User;
    projects: Map<string, Project>;
    posts: Array<Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    addComment: any;
    removePost: any;
    push: any;
}
export const PostsList = ({ user, projects, posts, comments, likes, users, addComment, removePost, push }: Props) => {
    const classes = useStyles();
    const style = { height: '200px' };

    return (
        <List>
            {posts.map((post: Post, index: number) => (
                <PostCard
                    key={`${post._id}-${index}`}
                    user={user}
                    object={post}
                    model={'Post'}
                    comments={post.comments.map(id => comments.get(id))}
                    likes={post.likes.map(id => likes.get(id))}
                    users={users as any}
                    title={post.title}
                    subtitle={`${users.get(post.author as any)?.publicName || 'Unknown user'} / ${moment(
                        post.created
                    ).format(EXT_DATE_FORMAT)}`}
                    body={post.body}
                    mediaMiddle={
                        <CardMedia style={style} image={img} /> // TODO: read from db
                    }
                    menuItems={[
                        {
                            name: 'Go to related project',
                            path: `/projects/${[...projects.entries()]
                                .filter(([projectId, proj]) => {
                                    console.log(proj.posts, post._id);
                                    return proj.posts.includes(post._id);
                                })
                                .flat()[0] || ''}`,
                        },
                    ]}
                    addComment={addComment}
                    removeObject={removePost}
                />
            ))}
        </List>
    );
};
