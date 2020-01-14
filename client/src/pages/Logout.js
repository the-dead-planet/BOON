import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import authService from '../services/authService';

const Logout = ({ user, onSuccess }) => {
    const [logoutRequestDone, setLogoutRequestDone] = useState(false);

    useEffect(() => {
        if (!logoutRequestDone) {
            authService
                .logout()
                .then(() => onSuccess())
                .finally(() => setLogoutRequestDone(true));
        }
    });

    if (logoutRequestDone) {
        return <Redirect to={'/'} />;
    } else {
        return (
            <div className="center">
                <NavBar user={user} />
                <h1>Logging you out</h1>
            </div>
        );
    }
};

export default Logout;
