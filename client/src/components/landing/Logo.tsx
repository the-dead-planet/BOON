import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { HashLink } from '../../utils/Link';
import { Typography } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        offset: {
            padding: '0.2em',
        },
    })
);

interface Props {
    id?: string;
}

export const Logo = ({ id = '#main-content' }: Props) => {
    const classes = useStyles();

    return (
        <HashLink to={id}>
            <Typography color="primary" variant="h4">
                — The —
            </Typography>
            <Typography color="primary" variant="h1">
                BOON
            </Typography>
            <Typography color="primary" className={classes.offset} variant="body2" gutterBottom>
                UK <VolumeUpIcon fontSize="small" />
                /bu:n/ | US <VolumeUpIcon fontSize="small" /> /bu:n/
            </Typography>
        </HashLink>
    );
};
