import { SuspenseImg } from '../../utils/SuspenseImg';
import { makeStyles, createStyles } from '@mui/styles';
import { Grid, Theme } from '@mui/material';
import Card from '../Card';
import { Format } from '../../constants/dateFormats';
import { User, Sprint, Comment, Like } from '../../logic/types';
import vintageImg from '../../img/content/vintage/typewriter2.jpg';
import frosticImg from '../../img/content/tech/gameboy.jpg';
import defaultImg from '../../img/content/tech/alien.jpg';
import vintageImgMin from '../../img/content/vintage/typewriter2-min.jpg';
import frosticImgMin from '../../img/content/tech/gameboy-min.jpg';
import defaultImgMin from '../../img/content/tech/alien-min.jpg';
import * as Utils from '../../utils';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

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
    sprint: Sprint;
    comments: Array<Comment | undefined>;
    likes: Array<Like | undefined>;
    users: Map<string, User>;
    getCreated?: (a: Date) => string;
    toggleCommentsPanel: (toggle: boolean) => void;
}

export const SprintOverview = ({
    sprint,
    comments,
    likes,
    users,
    toggleCommentsPanel,
}: Props) => {
    const classes = useStyles();
    const ui = Hooks.useSubject(AppState.ui$);
    const author: User | null = sprint.author ? users.get(sprint.author._id) : null;
    const authorPublicName = author ? author.publicName : 'unknown';
    // const isAuthor = users.get(String(sprint?.author) || '')?.publicName === user?.publicName;

    // TEMP
    const img = ui.theme === 'vintage' ? vintageImg : ui.theme === 'frostic' ? frosticImg : defaultImg;
    const imgMin = ui.theme === 'vintage' ? vintageImgMin : ui.theme === 'frostic' ? frosticImgMin : defaultImgMin;

    const content = sprint && (
        <Card
            object={sprint}
            model={'Sprint'}
            comments={comments}
            likes={likes}
            author={authorPublicName}
            title={`${sprint.title}`}
            created={`${sprint.dateFrom && Utils.DateTime.toFormat(sprint.dateFrom, Format.DATE_FORMAT)} - ${
                sprint.dateTo && Utils.DateTime.toFormat(sprint.dateTo, Format.DATE_FORMAT)
            }`}
            body={sprint.body}
            menuItems={[
                { name: 'Share', path: '/' },
                { name: 'Add post', path: `${sprint._id}/add_post` },
            ]}
            removeObject={(obj) => AppState.removeObject({ child: 'sprints', childId: obj.objectId })}
            toggleCommentsPanel={toggleCommentsPanel}
            linkBack={{ name: 'Home', path: '/' }}
            frosticNoRound={true}
            titleLink={`/sprints/${sprint._id}`}
        />
    );

    return (
        <Grid container className={classes.post}>
            <Grid item xs={12} md={7}>
                <SuspenseImg alt="main image" img={img} fallbackImg={imgMin} className={classes.img} onHover={true} />
            </Grid>

            <Grid item xs={12} md={5}>
                {content}
            </Grid>
        </Grid>
    );
};
