import React from 'react';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@mui/styles';
import { Box, Grid, Typography, Divider, Hidden, Theme } from '@mui/material';
import { AuthButtonsHorizontal, BrowseButton } from '../navigation/NavButtons';
import { Logo } from './Logo';
import { Dictionary } from './Dictionary';
import { DICTIONARY } from '../../constants/data';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerContainer: {
            position: 'relative',
        },
        topButtons: {
            position: 'absolute',
            top: 0,
            '&$right': {
                right: theme.spacing(4),
                left: 'auto',
            },
            '&$left': {
                left: theme.spacing(4),
                right: 'auto',
            },
        },
        left: {},
        right: {},
        headerText: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            textAlign: 'center',
        },
        headerDivider: {
            overflow: 'visible' /* For IE */,
            width: '90%',
            height: '30px',
            borderStyle: 'solid',
            borderColor: theme.palette.text.primary,
            borderWidth: '1px 0 0 0',
            borderRadius: '20px',
            '&::before': {
                display: 'block',
                content: "''",
                height: '30px',
                marginTop: '-31px',
                borderStyle: 'solid',
                borderColor: theme.palette.text.primary,
                borderWidth: '0 0 1px 0',
                borderRadius: '20px',
            },
        },
        divider: {
            margin: theme.spacing(2),
            backgroundColor: theme.palette.text.primary,
        },
        definitions: {
            padding: theme.spacing(2),
        },
    })
);

const Header: React.FC = () => {
    const classes = useStyles();
    const { explanation, definitions } = DICTIONARY;
    const ui = Hooks.useSubject(AppState.ui$);

    return (
        <Grid container justifyContent="center" className={classes.headerContainer}>
            {/* Browse button */}
            <Hidden smDown>
                <Box className={`${classes.topButtons} ${classes.left}`}>
                    <BrowseButton />
                </Box>
            </Hidden>

            {/* Authorization buttons */}
            <Hidden smDown>
                <Box className={`${classes.topButtons} ${classes.right}`}>
                    <AuthButtonsHorizontal />
                </Box>
            </Hidden>

            <Grid item className={classes.headerText}>
                <Logo />
            </Grid>

            <hr className={classes.headerDivider} />

            <Grid item xs={12} sm={8} className={classNames({ frostic: ui.theme === 'frostic' })}>
                {definitions.map((item, i) => (
                    <Dictionary key={i} i={i} {...item} />
                ))}

                <Divider variant="middle" className={classes.divider} />

                <Typography variant="body2" gutterBottom className={classes.definitions}>
                    {explanation}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Header;
