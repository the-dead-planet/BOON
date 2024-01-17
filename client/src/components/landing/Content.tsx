import React from 'react';
import classNames from 'classnames';
import { Container, Grid, Typography, Box,Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { Link } from '../../utils/Link';
import { Button } from '../mui-styled/Button';
import { LANDING_CONTENTS } from '../../constants/data';
import * as Routes from '../../routes';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentContainer: {
            marginTop: theme.spacing(10),
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
            margin: theme.spacing(6, 4, 2, 4),
            padding: theme.spacing(8, 2, 8, 2),
            height: '100%',
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
                borderColor: theme.palette.secondary.main,
                borderRadius: '20px',
                // background: `linear-gradient(to right, rgba(0, 0, 0, .04) 0%, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, .04) 100%)`
            },
        },
        contentItemBody: {
            marginBottom: theme.spacing(8),
        },
    })
);

const Content: React.FC = () => {
    const classes = useStyles();
    const ui = Hooks.useSubject(AppState.ui$);

    // TODO: Change this content to something which makes more sense, now it's quite a mess
    return (
        <Container maxWidth="lg" id="main-content" className={classes.contentContainer}>
            <Box className={classes.enterContainer}>
                <Link to={Routes.Types.RouterPaths.Sprints}>
                    <Typography
                        color="secondary"
                        variant="h2"
                        className={classNames(classes.enterButton, { frostic: ui.theme === 'frostic' })}
                    >
                        ENTER THE DEMO
                    </Typography>
                </Link>
            </Box>

            <Grid container justifyContent="space-around">
                {LANDING_CONTENTS.map((item, i) => (
                    <Grid item xs={12} sm={4} key={i} container direction="column" alignItems="center">
                        <div className={classNames(classes.gridContentItem, { frostic: ui.theme === 'frostic' })}>
                            <Typography variant="h3" color="textPrimary" gutterBottom>
                                {item.title}
                            </Typography>

                            <Typography
                                variant="h5"
                                color="textPrimary"
                                gutterBottom
                                className={classes.contentItemBody}
                            >
                                {item.text}
                            </Typography>

                            <Link to={item.path}>
                                <Button variant="outlined">
                                    <Typography variant="body1">{item.link}</Typography>
                                </Button>
                            </Link>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Content;
