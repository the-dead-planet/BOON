import React from 'react';
import { useStyles } from '../../styles/landing';
import { Link } from '../../utils/Link';
import { Container, Grid, Typography } from '@material-ui/core';
// import { Mode, User } from '../../logic/types';
import bed from '../../img/content/interior/bed.jpg';
import couch from '../../img/content/interior/couch.jpg';
import hall from '../../img/content/interior/hall.jpg';
import lightBulbs from '../../img/content/interior/light-bulbs.jpg';
import tableDecoration from '../../img/content/interior/table-decoration.jpg';
import table from '../../img/content/interior/table.jpg';
import wall from '../../img/content/interior/wall.jpg';
import { Landing } from '../../logic/types';
import { ShowInViewport, ShowSlideInViewport, ViewportImage } from '../../utils/InViewPort';

const Content = ({ user, mode, setMode, title, subtitle, button }: Landing) => {
    const classes = useStyles();
    const contents = [
        {
            title: 'BRAG',
            text: 'about all the cool stuff you developed last sprint.',
            img: table,
            link: 'Sprint news',
            path: '/sprints',
        },
        {
            title: 'HELP',
            text: 'the ones who need your help to get transparency of your project developments.',
            img: tableDecoration,
            link: 'Projects overview',
            path: '/projects',
        },
        {
            title: 'GOSS',
            text: 'about about the super stars behind productivity in your team.',
            img: bed,
            link: 'Meet the teams',
            path: '/teams',
        },
    ];
    // TODO: Change this content to something which makes more sense, now it's quite a mess
    return (
        <Container maxWidth="md" id="main-content" className={classes.contentContainer}>
            <Link to={'/sprints'}>
                <Typography color="secondary" variant="h1" className={classes.enterButton}>
                    ENTER THE DEMO
                </Typography>
            </Link>

            <Grid container justify="space-around">
                {contents.map((item, i) => (
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        key={i}
                        className={classes.gridContentItem}
                        container
                        direction="column"
                        alignItems="center"
                    >
                        <Typography color="primary" variant="h3" gutterBottom>
                            {item.title}
                        </Typography>

                        <Typography color="primary" variant="h5" gutterBottom className={classes.contentItemBody}>
                            {item.text}
                        </Typography>

                        <Typography color="primary" variant="body1" className={classes.button}>
                            <Link to={item.path}>{item.link}</Link>
                        </Typography>
                        {/* <ViewportImage src={item.img} /> */}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Content;
