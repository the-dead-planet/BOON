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
        <React.Fragment>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </React.Fragment>
    );
};

export default SimpleCollapse;
