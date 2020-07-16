import React from 'react';
import { Posts } from './post/Posts';
// import { Container } from '@material-ui/core';
import { SprintOverview } from './Overview';
// import usersService from '../../../services/usersService';
import { User, Sprint, Post, Comment, Like } from '../../../logic/types';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
interface Props {
    user: User;
    sprint: Sprint | undefined;
    posts: Map<string, Post>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    updateStateData: any;
    onError: any;
}

export const SingleSprint = ({ user, sprint, posts, comments, likes, users, updateStateData, onError }: Props) => {
    return sprint ? (
        <React.Fragment>
            <SprintOverview
                user={user}
                sprint={sprint}
                comments={sprint.comments.map(id => comments.get(id))}
                likes={sprint.likes.map(id => likes.get(id))}
                users={users}
                updateStateData={updateStateData}
                onError={onError}
            />
            <Posts
                user={user}
                posts={sprint.posts.map(id => posts.get(id))}
                comments={comments}
                likes={likes}
                users={users}
                updateStateData={updateStateData}
            />
        </React.Fragment>
    ) : (
        <React.Fragment />
    );
};
