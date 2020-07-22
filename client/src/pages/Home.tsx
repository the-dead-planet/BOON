import React, { Suspense, lazy } from 'react';
import { withPush } from '../utils/routingDecorators';
import { guestPage } from '../utils/authenticatedPage';
import { useStyles } from '../styles/main';
import ThemeWrapper from '../components/navigation/ThemeWrapper';
import { LinearBuffer } from '../components/Loading';
// import Header1 from '../components/landings/Header1';
import { Mode, User } from '../logic/types';
import { PATHS } from '../constants/data';
import ContentSimple from '../components/animated/ContentSimple';
const HeaderSimple = lazy(() => import('../components/headers/HeaderSimple'));
const { register } = PATHS;


interface Props {
    user: User,
    mode: Mode,
    setMode: any,
    push: string,
}

const LandingSimple = ({ user, mode, setMode, push }: Props) => {
    const classes = useStyles();

    return (
        <Suspense fallback={<LinearBuffer />}>
            <ThemeWrapper mode={mode}>
                <HeaderSimple
                    user={user}
                    mode={mode}
                    setMode={setMode}
                    title="Awesome landing page"
                    subtitle="Start of the coolest project"
                    button={{ name: "Get started", path: register }}
                />
                <ContentSimple
                    user={user}
                    mode={mode}
                    setMode={setMode}
                    title="Awesome landing page"
                    subtitle="Start of the coolest project"
                    button={{ name: "Get started", path: register }}
                />
            </ThemeWrapper>
        </Suspense>
    );
}


export default guestPage(withPush(LandingSimple));