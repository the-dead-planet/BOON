import React from 'react';
import Collapse from '@material-ui/core/Collapse';

interface Props {
    expanded: boolean;
    title: string;
    children: React.ReactChild | React.ReactChildren | Array<React.ReactChildren>;
}

// TODO: fix the warning about children
const SimpleCollapse = ({ expanded, title, children }: Props) => {
    return (
        <>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </>
    );
};

export default SimpleCollapse;
