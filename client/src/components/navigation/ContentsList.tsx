import React from 'react';
import { useStyles } from '../../styles/main';
import { HashLink } from '../../utils/Link';
import { List, ListItem, Typography } from '@material-ui/core';
import { LinkTo } from '../../logic/types';

interface Props {
    title?: string;
    items: Array<LinkTo>;
}

// TODO: investigate why Link from router does not handle hashes #
const ContentsList = ({ title, items }: Props) => {
    const classes = useStyles();

    return (
        <List>
            {title && <ListItem className={classes.bold}>{title}</ListItem>}

            {items.map((item, i) => (
                <HashLink key={`link-item-${i}`} to={`#${item.path}` || '/'} smooth={true}>
                    <ListItem key={`item-${i}`} className={classes.pageNavList} button>
                        <Typography key={`item-text-${i}`} variant="body2" title={item.name} gutterBottom noWrap>
                            {item.name}
                        </Typography>
                    </ListItem>
                </HashLink>
            ))}
        </List>
    );
};

export default ContentsList;
