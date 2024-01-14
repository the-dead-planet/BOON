import React from 'react';
import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        pointer: {
            cursor: 'pointer'
        }
    })
);

// Global CSS at index.css for html elements 'a' does not work in all browsers, for example in Firefox.
// Below wrapper components inject style which removes link underline from the link components
// This solution works in all browsers.
const styles = {
    textDecoration: 'none',
    color: 'inherit',
};

// React router link needs to be applied in all internal routes
// to make sure that history is correctly updated
// Do not use other link components and 'href' props.
interface Props {
    children?: React.ReactNode;
    to: string;
    className?: string;
}

export const Link = ({ children, ...props }: Props) => (
    <RouterLink style={styles} {...props}>
        {children}
    </RouterLink>
);

interface HashLinkProps {
    to: string;
    className?: string;
    children?: React.ReactNode;
}

export const HashLink: React.FC<HashLinkProps> = ({ to, children, className }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClick = React.useCallback(
        () => navigate(`#${to}`),
        [to, navigate]
    );

    return (
        <div onClick={handleClick} className={classNames(classes.pointer, className)}>
            {children}
        </div>
    );
};

interface LinkProps {
    hash: boolean;
    children?: React.ReactNode;
    to: string;
    className?: string;
}

export const LinkComponent = ({ hash, ...props }: LinkProps) => {
    const { children, ...linkProps } = props;
    const Component = hash ? HashLink : Link;

    return <Component {...linkProps}>{children}</Component>;
};
