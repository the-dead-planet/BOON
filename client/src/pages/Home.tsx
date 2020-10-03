import React from 'react';
import { useStyles } from '../styles/landing';
import { withPush } from '../utils/routingDecorators';
import { guestPage } from '../utils/authenticatedPage';
import { Box } from '@material-ui/core';
import ThemeWrapper from '../components/navigation/ThemeWrapper';
import Content from '../components/landing/Content';
import Header from '../components/landing/Header';
import { Mode, User } from '../logic/types';
import { PATHS } from '../constants/data';
const { register } = PATHS;

interface Props {
    user: User;
    mode: Mode;
    setMode: any;
    push: string;
}

const Home = ({ user, mode, setMode, push }: Props) => {
    const classes = useStyles();

    return (
        <ThemeWrapper mode={mode}>
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
        </ThemeWrapper>
    );
};

export default guestPage(withPush(Home));
