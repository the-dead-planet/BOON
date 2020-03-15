import React from 'react';
import { Posts } from './post/Posts';
import Container from '@material-ui/core/Container';
import { SprintOverview } from './Overview';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
export const SingleSprint = ({ user, sprint, onError }) => {
    return (
        <Container maxWidth="md">
            <SprintOverview user={user} sprint={sprint} model="Sprint" onError={onError} />
            <Posts user={user} {...sprint} />
        </Container>
    );
};
