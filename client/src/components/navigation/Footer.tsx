import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import { Link } from '../../utils/Link';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            marginTop: theme.spacing(4),
            minHeight: '200px',
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            color: 'rgba(255, 255, 255, .6)',
            borderRadius: '20px 20px 0 0',
            position: 'relative',
            '&::after': {
                content: "''",
                position: 'absolute',
                top: '-50px',
                bottom: '100%',
                left: 0,
                right: 0,
                borderStyle: 'solid',
                borderWidth: '0 0 2px 0',
                borderColor: theme.palette.primary.main,
                borderRadius: '20px',
                zIndex: 10,
            },
        },
    })
);

const Footer = () => {
    const classes = useStyles();

    return (
        <Grid container justify="space-around" alignItems="center" className={classes.footer}>
            <div>Footer content</div>
        </Grid>
    );
};

export default Footer;
