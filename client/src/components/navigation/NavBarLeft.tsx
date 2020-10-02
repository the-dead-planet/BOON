import React from 'react';
import { useStyles } from '../../styles/main';
import { NavContent, SideColumn } from '../../logic/types';
import { Typography, Box } from '@material-ui/core';
import { LinkComponent } from '../../utils/Link';

interface NavBarLeftProps {
    contents: NavContent;
    sideColumn?: SideColumn;
}

// A temporary component that is going to be implemented in Layout in the long run.
const NavBarLeft = ({ contents, sideColumn }: NavBarLeftProps) => {
    const classes = useStyles();

    return (
        <Box className={classes.sideCol}>
            {/* Main navigation panel */}
            <Box className={classes.navContainer}>
                {contents.map((content, index) => (
                    <Box key={index}>
                        <Typography variant="body2" className={classes.navTitle}>
                            {content.header}
                        </Typography>

                        {content.list.map((item, i) => (
                            <LinkComponent key={i} hash={item.hash || false} to={item.path}>
                                <Typography
                                    variant="body2"
                                    className={`${classes.panelButton} ${
                                        item.id === content.activeId ? classes.selected : undefined
                                    }`}
                                >
                                    {item.name}
                                </Typography>
                            </LinkComponent>
                        ))}
                    </Box>
                ))}
            </Box>

            {/* Additional / optional column under the navigation panel */}
            {sideColumn && (
                <Box className={classes.gossColContainer}>
                    <Typography variant="h5" className={classes.gossColTitle}>
                        {sideColumn.header}
                    </Typography>
                    <Typography variant="body2">{sideColumn.body}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default NavBarLeft;
