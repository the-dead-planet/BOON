import React from 'react';
import { Img } from 'react-image';
// import { useStyles } from '../../../styles/main';
import { Grid } from '@material-ui/core';
import { PostCard } from './post/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import moment from 'moment';
import { DATE_FORMAT } from '../../../utils/constants';
import { User, Sprint, Comment, Like } from '../../../logic/types';
import { PATHS } from '../../../constants/data';
import img from '../../../img/content/vintage/typewriter.jpg';
const { home } = PATHS;

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
    removeObject: any;
    onError: any;
}

export const SprintOverview = ({ user, sprint, comments, likes, users, addComment, removeObject, onError }: Props) => {
    // const classes = useStyles();

    const author: User | null = users.get(sprint.author as any); // FIXME: types are probably incompatible.
    const authorPublicName = author ? author.publicName : 'unknown';
    const isAuthor = users.get(String(sprint?.author) || '')?.publicName === user?.publicName;

    const content = sprint && (
        // TODO: Create a sprint card
        <PostCard
            user={user}
            object={sprint}
            model={'Sprint'}
            comments={comments}
            likes={likes}
            users={users}
            title={`${sprint.title}`}
            subtitle={`${authorPublicName} // ${sprint.dateFrom && moment(sprint.dateFrom).format(DATE_FORMAT)} - ${
                sprint.dateTo && moment(sprint.dateTo).format(DATE_FORMAT)
            }`}
            body={sprint.body}
            menuItems={[
                { name: 'Share', path: '/' },
                { name: 'Add post', path: `${sprint._id}/add_post` },
            ]}
            addComment={addComment}
            removeObject={(id: string) => removeObject({ child: 'sprints', childId: id })}
            removeComment={(id: string, sprintId: string) =>
                removeObject({ child: 'comments', childId: id, parent: 'sprints', parentId: sprintId })
            }
        />
    );

    return (
        <Grid container style={{ border: '1px solid rgba(0, 0, 0, .13)', padding: '.5em' }}>
            <Grid item xs={12} md={8}>
                <Img
                    src={img}
                    style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '400px',
                        objectFit: 'cover',
                        objectPosition: '50% 50%',
                    }}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                {content}
            </Grid>
        </Grid>
    );
};
