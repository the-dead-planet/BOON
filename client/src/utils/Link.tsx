import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HashLink as RouterHashLink } from 'react-router-hash-link';
import { Children } from '../logic/types';

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
    children: Children;
    to: string;
    className?: any;
}

export const Link = ({ children, ...props }: Props) => (
    <RouterLink style={styles} {...props}>
        {children}
    </RouterLink>
);

// Hashlinks are used in navigation components which scroll the page to a given #id
interface HashProps {
    children: Children;
    to: string;
    className?: any;
    smooth?: boolean;
}

export const HashLink = ({ children, ...props }: HashProps) => (
    <RouterHashLink style={styles} {...props}>
        {children}
    </RouterHashLink>
);
