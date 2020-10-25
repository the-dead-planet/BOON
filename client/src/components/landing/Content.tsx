import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from '../../utils/Link';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import { Button } from '../mui-styled/Button';
import { LANDING_CONTENTS } from '../../constants/data';
import { User, Mode } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentContainer: {
            marginTop: '20px',
            color: 'rgba(255, 255, 255, .87)',
        },
        enterContainer: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
        },
        enterButton: {
            padding: theme.spacing(6),
            textAlign: 'center',
            border: `solid .2em ${theme.palette.secondary.main}`,
            boxShadow: `0 0 ${theme.palette.secondary.dark}`,
            // transition: 'box-shadow .1s linear',
            '&:hover': {
                cursor: 'pointer',
                // transform: "translate(-.2em, -.2em)",
                // transition: 'box-shadow .1s linear',
                boxShadow: `.2em .2em ${theme.palette.secondary.dark}`,
            },
        },
        gridContentItem: {
            marginTop: theme.spacing(4),
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            // border: `2px solid ${theme.palette.primary.main}`,
            textAlign: 'center',
            position: 'relative',
            borderStyle: 'solid',
            borderWidth: '0 2px 0 2px',
            borderColor: 'transparent',
            borderRadius: '20px',
            '&:hover': {
                borderStyle: 'solid',
                borderWidth: '0 2px 0 2px',
                borderColor: theme.palette.primary.main,
                borderRadius: '20px',
                // background: `linear-gradient(to right, rgba(0, 0, 0, .04) 0%, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, .04) 100%)`
            },
        },
        contentItemBody: {
            marginBottom: theme.spacing(8),
        },
    })
);

interface Props {
    user: User;
    mode: Mode;
    setMode: any;
}

const Content = ({ user, mode, setMode }: Props) => {
    const classes = useStyles();
    // TODO: Change this content to something which makes more sense, now it's quite a mess
    return (
        <Container maxWidth="md" id="main-content" className={classes.contentContainer}>
            <Box className={classes.enterContainer}>
                <Link to={'/sprints'}>
                    <Typography color="secondary" variant="h2" className={classes.enterButton}>
                        ENTER THE DEMO
                    </Typography>
                </Link>
            </Box>

            <Grid container justify="space-around">
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

                        <Link to={item.path}>
                            <Button variant="outlined" color="primary">
                                <Typography color="primary" variant="body1">
                                    {item.link}
                                </Typography>
                            </Button>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Content;
