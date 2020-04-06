import React from 'react';
import { Posts } from './post/Posts';
import Container from '@material-ui/core/Container';
import { SprintOverview } from './Overview';
import usersService from '../../../services/usersService';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const SingleSprint = ({ user, sprint, posts, comments, likes, authors, onError }) => {
    return (
        <Container maxWidth="md">
            {sprint ? (
                <React.Fragment>
                    <SprintOverview
                        user={user}
                        sprint={sprint}
                        comments={sprint.comments.map(id => comments.get(id))}
                        likes={sprint.likes.map(id => likes.get(id))}
                        authors={authors}
                        onError={onError}
                    />
                    <Posts
                        user={user}
                        posts={sprint.posts.map(id => posts.get(id))}
                        comments={comments}
                        likes={likes}
                        authors={authors}
                    />
                </React.Fragment>
            ) : (
                <div></div>
            )}
        </Container>
    );
};
