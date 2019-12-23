import { Redirect } from 'react-router-dom';
import React from 'react';

// Renders the component if the user is logged in.
// Redirects to the login page otherwise.
export const withLoginRequired = wrappedComponent => props => {
    const {
        user,
        location: { pathname },
    } = props;
    if (user) {
        return wrappedComponent(props);
    } else {
        return <Redirect to={{ pathname: '/login', search: `?next=${pathname}` }} />;
    }
};
