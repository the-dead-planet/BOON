import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HashLink as RouterHashLink } from 'react-router-hash-link';
import { Children } from '../logic/types';

interface Props {
    children: Children;
    to: string;
    className?: any;
}

const styles = {
    textDecoration: "none",
    color: "inherit",
}

export const Link = ({ children, ...props }: Props) => (
    <RouterLink style={styles} {...props}>
        {children}
    </RouterLink>
)

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
)