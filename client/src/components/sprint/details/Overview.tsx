import React from 'react';
import { useStyles } from '../../../styles/main';
import { Box } from '@material-ui/core';
import { PostCard } from './post/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import moment from 'moment';
import { DATE_FORMAT } from '../../../utils/constants';
import { User, Sprint, Comment, Like } from '../../../logic/types';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.
interface Props {
    user: User | null | undefined;
    sprint: Sprint;
    comments: Array<Comment | undefined>;
    likes: Array<Like | undefined>;
    users: Map<string, User>;
    addComment: any;
    onError: any;
}

export const SprintOverview = ({ user, sprint, comments, likes, users, addComment, onError }: Props) => {
    const classes = useStyles();

    const author: User | null = users.get(sprint.author as any); // FIXME: types are probably incompatible.
    const authorPublicName = author ? author.publicName : 'unknown';

    const content = sprint ? (
        // TODO: Create a sprint card
        <PostCard
            user={user}
            object={sprint}
            model={'Sprint'}
            comments={comments}
            likes={likes}
            users={users}
            title={`No${sprint.number} // ${sprint.title}`}
            subtitle={`${authorPublicName} // ${
                // TODO: solve possiblyundefined
                sprint.dateFrom ? moment(sprint.dateFrom).format(DATE_FORMAT) : null
            } - ${sprint.dateTo ? moment(sprint.dateTo).format(DATE_FORMAT) : null}`}
            body={sprint.body}
            // mediaTop={<CardMedia className={classes.height200} image={sprint.image} />}
            // mediaTop={<CardMedia className={classes.height200} image={require('../../../img/landing/landing-1.png')} />}
            menuItems={[{ name: 'Cos tu wymyslimy', path: '/' }]}
            addComment={addComment}
        />
    ) : null;

    return (
        <Box>
            {/* <SprintHeader {...sprint} />
        <SprintContent {...sprint} />
        <SprintModifyButtons user={user} sprint={sprint} model={'Sprint'} onError={onError} /> */}
            {content}
        </Box>
    );
};
