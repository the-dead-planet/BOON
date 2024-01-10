import React from 'react';
import Collapse from '@mui/material/Collapse';

interface Props {
    expanded: boolean;
    title: string;
    children?: React.ReactNode;
}

// TODO: fix the warning about children
const SimpleCollapse = ({ expanded, children }: Props) => {
    return (
        <>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </>
    );
};

export default SimpleCollapse;
