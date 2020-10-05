import React from 'react';
import { useStyles } from '../../styles/landing';
import { Link } from '../../utils/Link';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import { Landing } from '../../logic/types';
import { LANDING_CONTENTS } from '../../constants/data';

const Content = ({ user, mode, setMode, title, subtitle, button }: Landing) => {
    const classes = useStyles();
    // TODO: Change this content to something which makes more sense, now it's quite a mess
    return (
        <Container maxWidth="md" id="main-content" className={classes.contentContainer}>
            <Box className={classes.enterContainer}>
                <Link to={'/sprints'}>
                    <Typography color="secondary" variant="h1" className={classes.enterButton}>
                        ENTER THE DEMO
                    </Typography>
                </Link>
            </Box>

            <Grid container justify="space-around" className={classes.contents}>
                {LANDING_CONTENTS.map((item, i) => (
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
