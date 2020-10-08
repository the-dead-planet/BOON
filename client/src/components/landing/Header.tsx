import React from 'react';
import { useStyles } from '../../styles/landing';
import { Box, Grid, Typography, Divider } from '@material-ui/core';
import { Logo } from './Logo';
import { AuthButtonsHorizontal } from '../navigation/AuthButtons';
import { Dictionary } from './Dictionary';
import { DICTIONARY } from '../../constants/data';
import { User } from '../../logic/types';

interface Props {
    user: User;
}
const Header = ({ user }: Props) => {
    const classes = useStyles();

    const { explanation, definitions } = DICTIONARY;

    return (
        <Grid container justify="center" className={classes.headerContainer}>
            <Box className={`${classes.topButtons} ${classes.right}`}>
                <AuthButtonsHorizontal user={user} />
            </Box>
            <Grid item xs={12} className={classes.headerText}>
                <Logo />
            </Grid>

            <hr className={classes.headerDivider} />

            <Grid item xs={12} sm={8}>
                {definitions.map((item, i) => (
                    <Dictionary i={i} {...item} />
                ))}

                <Divider variant="middle" className={classes.divider} />

                <Typography color="primary" variant="body2" gutterBottom className={classes.definitions}>
                    {explanation}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Header;
