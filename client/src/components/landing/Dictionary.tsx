import React from 'react';
import { useStyles } from '../../styles/landing';
import { Box, Typography } from '@material-ui/core';

interface Props {
    i: number;
    clause: string;
    body: string;
    example: string;
    synonyms: string;
}

export const Dictionary = ({ i, clause, body, example, synonyms }: Props) => {
    const classes = useStyles();

    return (
        <Box key={i} className={classes.definitions}>
            <Typography color="primary" variant="caption" className={classes.textDecor}>
                {clause}
            </Typography>

            <Typography color="primary" variant="body1" gutterBottom>
                {i + 1}. {body}
            </Typography>

            <Typography color="secondary" variant="body2" gutterBottom className={classes.example}>
                {example}
            </Typography>

            <Typography color="primary" variant="caption" gutterBottom>
                <b>Synonyms:</b> {synonyms}
            </Typography>
        </Box>
    );
};
