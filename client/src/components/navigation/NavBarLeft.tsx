import React from 'react';
import { useStyles } from '../../styles/main';
import { User, Sprint, Post, Project, Comment, Like } from '../../logic/types';
import { Typography, Hidden, Box, Grid, Divider } from '@material-ui/core';
import ContentsList from './ContentsList';
import { Link, HashLink, LinkComponent } from '../../utils/Link';

interface NavBarLeftProps {
    // sprint: Sprint | undefined;
    // posts: Map<string, Post>;
    contents: Array<{
        header: string;
        list: Array<{
            id: string;
            name: string;
            path: string;
            hash?: boolean; // if path is refering to an id of any of the html components on the page, use HashLink, otherwise use Link
        }>;
        activeId?: string;
    }>;
}

// A temporary component that is going to be implemented in Layout in the long run.
const NavBarLeft = ({ contents }: NavBarLeftProps) => {
    const classes = useStyles();

    return (
        <Hidden smDown>
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
                                        className={`${classes.navButton} ${
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
                <Box className={classes.gossColContainer}>
                    <Typography variant="h5" className={classes.gossColTitle}>
                        _goss
                    </Typography>
                </Box>
            </Box>
        </Hidden>
    );
};

export default NavBarLeft;

// {sprint ? (
//     <ContentsList
//         items={sprint.posts
//             .map((id) => posts.get(id))
//             .map((post) => ({ name: post?.title, path: post?._id }))}
//     />
// ) : null}

// <Typography variant="body2" className={classes.navTitle}>
//     Related Projects
// </Typography>

// {sprint ? (
//     <ContentsList
//         items={sprint.posts
//             .map((id) => posts.get(id))
//             .map((post) => ({ name: post?.title, path: post?._id }))}
//     />
// ) : null}

// <Typography variant="body2" className={classes.navTitle}>
//     Add Stuff
// </Typography>

// {[
//     { name: 'New sprint', path: '/add_sprint' },
//     { name: 'New project', path: '/add_project' },
//     { name: 'New post', path: '/add_post' },
// ].map((item, i) => (
// <Link key={i} to={item.path}>
//     <Typography variant="body2" className={classes.navButton}>
//         {item.name}
//     </Typography>
// </Link>
// ))}
