import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles(theme => ({
//     root: {
//         height: 180,
//     },
//     container: {
//         display: 'flex',
//     },
//     paper: {
//         margin: theme.spacing(1),
//     },
//     svg: {
//         width: 100,
//         height: 100,
//     },
//     polygon: {
//         fill: theme.palette.common.white,
//         stroke: theme.palette.divider,
//         strokeWidth: 1,
//     },
// }));

// TODO: fix the warning about children
const SimpleCollapse = ({ title, children, push }) => {
    // const classes = useStyles();
    const [toggle, setToggle] = React.useState(false);

    const handleChange = () => {
        setToggle(prev => !prev);
    };

    return (
        <React.Fragment>
            <FormControlLabel control={<Button onClick={handleChange} />} label={title} />
            <Collapse in={toggle}>{children}</Collapse>
        </React.Fragment>
    );
};

export default SimpleCollapse;
