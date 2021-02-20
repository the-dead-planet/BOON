import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        definitions: {
            padding: theme.spacing(2),
        },
        textDecor: {
            fontStyle: 'italic',
        },
        example: {
            padding: theme.spacing(2),
            fontStyle: 'italic',
        },
    })
);

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
            <Typography variant="caption" className={classes.textDecor}>
                {clause}
            </Typography>

            <Typography variant="body1" gutterBottom>
                {i + 1}. {body}
            </Typography>

            <Typography color="secondary" variant="body2" gutterBottom className={classes.example}>
                {example}
            </Typography>

            <Typography variant="caption" gutterBottom>
                <b>Synonyms:</b> {synonyms}
            </Typography>
        </Box>
    );
};
