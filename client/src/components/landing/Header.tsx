import React from 'react';
import { useStyles } from '../../styles/landing';
import { HashLink, Link } from '../../utils/Link';
import { Box, Grid, Typography, Divider } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Landing } from '../../logic/types';

// Use this header above a container component with id="main-content" to allow proper scrolling effect on click on the arrow img icon
const Header = ({ user, mode, setMode, title, subtitle, button }: Landing) => {
    const classes = useStyles();

    const dictionary = {
        explanation:
            'Boon derives from the Old Norse bón, a request for a favor. Think of a boon as a favor that no one has necessarily asked for, something extra. "We\'d just spent our last dollar on a cup of coffee so it was a real boon to find a ten dollar bill lying on the sidewalk." Boon can also be an adjective for someone friendly and welcoming, as in "a boon companion."',
        definitions: [
            {
                clause: 'noun',
                body: 'something that is very helpful and improves the quality of life',
                example:
                    "Getting called out of school on the day of the test was a boon for Sam, as he hadn't remembered to study.",
                synonyms: 'blessing',
            },
            // {
            //     clause: "adjective",
            //     body: "very close and convivial",
            //     example: "boon companions",
            //     synonyms: "close",
            // },
        ],
    };

    return (
        <Grid container justify="center" style={{ padding: '0 1em' }}>
            <Grid item xs={12} className={classes.headerText}>
                <HashLink to="#main-content">
                    <Typography color="primary" variant="h4">
                        — The —
                    </Typography>
                    <Typography color="primary" variant="h1">
                        BOON
                    </Typography>
                    <Typography color="primary" className={classes.offset} variant="body1" gutterBottom>
                        UK <VolumeUpIcon fontSize="small" />
                        /bu:n/ | US <VolumeUpIcon fontSize="small" /> /bu:n/
                    </Typography>
                </HashLink>
            </Grid>

            <Grid item xs={12} sm={8}>
                {dictionary.definitions.map((item, i) => (
                    <Box key={i} className={classes.definitions}>
                        <Typography color="primary" variant="caption" className={classes.textDecor}>
                            {item.clause}
                        </Typography>

                        <Typography color="primary" variant="body1" gutterBottom>
                            {i + 1}. {item.body}
                        </Typography>

                        <Typography color="secondary" variant="body2" gutterBottom className={classes.example}>
                            {item.example}
                        </Typography>

                        <Typography color="primary" variant="caption" gutterBottom>
                            <b>Synonyms:</b> {item.synonyms}
                        </Typography>
                    </Box>
                ))}

                <Divider variant="middle" />

                <Typography color="primary" variant="body2" gutterBottom className={classes.definitions}>
                    {dictionary.explanation}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Header;
