import React, { Suspense, lazy } from 'react';
import { useStyles } from '../styles/landing';
import { withPush } from '../utils/routingDecorators';
import { guestPage } from '../utils/authenticatedPage';
import ThemeWrapper from '../components/navigation/ThemeWrapper';
import { Box } from '@material-ui/core';
import { LinearBuffer } from '../components/Loading';
// import Header1 from '../components/landings/Header1';
import { Mode, User } from '../logic/types';
import { PATHS } from '../constants/data';
import Content from '../components/landing/Content';
import Header from '../components/landing/Header';
const { register } = PATHS;

interface Props {
    user: User;
    mode: Mode;
    setMode: any;
    push: string;
}

const LandingSimple = ({ user, mode, setMode, push }: Props) => {
    const classes = useStyles();

    return (
        <Suspense fallback={<LinearBuffer />}>
            <ThemeWrapper mode={mode}>
                <Box className={classes.background}>
                    <Header
                        user={user}
                        mode={mode}
                        setMode={setMode}
                        title="Awesome landing page"
                        subtitle="Start of the coolest project"
                        button={{ name: 'Get started', path: register }}
                    />
                    <Content
                        user={user}
                        mode={mode}
                        setMode={setMode}
                        title="Awesome landing page"
                        subtitle="Start of the coolest project"
                        button={{ name: 'Get started', path: register }}
                    />
                </Box>
            </ThemeWrapper>
        </Suspense>
    );
};

export default guestPage(withPush(LandingSimple));
