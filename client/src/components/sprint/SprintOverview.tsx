import React from 'react';
import { Img } from 'react-image';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { PostCard } from './Card';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants/dateFormats';
import { User, Sprint, Comment, Like } from '../../logic/types';
import img from '../../img/content/vintage/typewriter.jpg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        post: {
            border: `1px solid ${theme.palette.primary.light}`,
            padding: '.5em',
        },
        img: {
            width: '100%',
            minHeight: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            objectPosition: '50% 50%',
        },
    })
);

interface Props {
    user: User | null | undefined;
    sprint: Sprint;
    comments: Array<Comment | undefined>;
    likes: Array<Like | undefined>;
    users: Map<string, User>;
    getCreated?: (a: Date) => string;
    addComment: any;
    removeSprint: any;
    removeComment: any;
    toggleCommentsPanel: any;
    onError: any;
}

export const SprintOverview = ({
    user,
    sprint,
    comments,
    likes,
    users,
    addComment,
    removeSprint,
    removeComment,
    toggleCommentsPanel,
    onError,
}: Props) => {
    const classes = useStyles();

    const author: User | null = users.get(sprint.author as any); // FIXME: types are probably incompatible.
    const authorPublicName = author ? author.publicName : 'unknown';
    // const isAuthor = users.get(String(sprint?.author) || '')?.publicName === user?.publicName;

    const content = sprint && (
        // TODO: Create a sprint card
        <PostCard
            user={user}
            object={sprint}
            model={'Sprint'}
            comments={comments}
            likes={likes}
            users={users}
            author={authorPublicName}
            title={`${sprint.title}`}
            created={`${sprint.dateFrom && moment(sprint.dateFrom).format(DATE_FORMAT)} - ${
                sprint.dateTo && moment(sprint.dateTo).format(DATE_FORMAT)
            }`}
            body={sprint.body}
            menuItems={[
                { name: 'Share', path: '/' },
                { name: 'Add post', path: `${sprint._id}/add_post` },
            ]}
            addComment={addComment}
            removeObject={(id: string) => removeSprint(id)}
            removeComment={(id: string) => removeComment(id)}
            toggleCommentsPanel={toggleCommentsPanel}
            linkBack={{ name: 'Home', path: '/' }}
        />
    );

    return (
        <Grid container className={classes.post}>
            <Grid item xs={12} md={7}>
                <Img src={img} className={classes.img} />
            </Grid>

            <Grid item xs={12} md={5}>
                {content}
            </Grid>
        </Grid>
    );
};
