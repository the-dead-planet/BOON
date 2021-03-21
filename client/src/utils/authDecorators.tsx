import { Redirect } from 'react-router-dom';
import React from 'react';
import { PATHS } from '../constants/data';
const { login, main } = PATHS;

// Renders the component if the user is logged in.
// Redirects to the login page otherwise.
export const withLoginRequired = (wrappedComponent: any) => (props: any) => {
    const {
        user,
        location: { pathname },
    } = props;

    if (user) {
        return wrappedComponent(props);
    } else {
        return <Redirect to={{ pathname: login, search: `?next=${pathname}` }} />;
    }
};

// Renders the component if the user is not logged in.
// Redirects to the login page otherwise.
export const withoutLoginRequired = (wrappedComponent: any) => (props: any) => {
    const {
        user,
        location: { pathname },
    } = props;
    if (!user) {
        return wrappedComponent(props);
    } else {
        return <Redirect to={{ pathname: main }} />;
    }
};
