import React from 'react';
import AppLayout from '../layouts/AppLayout';
import Content from '../components/landing/Content';
import Header from '../components/landing/Header';

export const Home: React.FC = () => {
    return (
        <AppLayout>
            <Header />
            <Content />
        </AppLayout>
    );
}
