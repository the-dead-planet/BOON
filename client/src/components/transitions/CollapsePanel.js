import React from 'react';
import Collapse from '@material-ui/core/Collapse';

// TODO: fix the warning about children
const SimpleCollapse = ({ expanded, title, children }) => {
    return (
        <React.Fragment>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </React.Fragment>
    );
};

export default SimpleCollapse;
