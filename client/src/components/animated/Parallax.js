import React from 'react';
import { useStyles } from '../../styles/main';
import { Container, Grid, Typography } from '@material-ui/core';
import { RellaxWrapper } from 'react-rellax-wrapper';

// TODO: create a page with graphics moving in different speeds
// Also apply to svg elements to "break" graphic apart
// TODO: there is an error with typescript - create a new js component which receives property speed, to use inside tsx files
const Parallax = ({ user, mode, setDarkMode, title, subtitle, button }) => {
    const classes = useStyles();
    const style = { marginTop: '20px' };
    const style2 = { minHeight: '100vh' };

    return (
        <Container maxWidth="lg" id="main-content" style={style}>
            <Grid container direction="row" style={style2}>
                <Grid item xs={4}>
                    <RellaxWrapper speed={2}>
                        <Typography variant="h4" color="secondary">
                            Fast
                        </Typography>
                    </RellaxWrapper>
                </Grid>

                <Grid item xs={4}>
                    <RellaxWrapper speed={-2}>
                        <Typography variant="h4" color="secondary">
                            Fast
                        </Typography>
                    </RellaxWrapper>
                </Grid>

                <Grid item xs={4}>
                    <RellaxWrapper speed={-4}>
                        <Typography variant="h4" color="secondary">
                            Fast
                        </Typography>
                    </RellaxWrapper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Parallax;
