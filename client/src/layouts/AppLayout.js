import React from 'react';

import NavBar from '../components/NavBar';

const AppLayout = ({ user, children }) => (
    <div>
        <NavBar user={user} />
        {children}
    </div>
);

export default AppLayout;
