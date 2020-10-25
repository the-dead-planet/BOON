import React from 'react';
// import { useStyles } from '../../styles/main';
import { Box } from '@material-ui/core';
import { TreeView } from '@material-ui/lab/';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import SprintListItem from './SprintListItem';
import moment from 'moment';
import { YEAR_DATE_FORMAT } from '../../constants/dateFormats';
import { Sprint } from '../../logic/types';

interface Props {
    sprints: Map<string, Sprint>;
    currentSprintId: string;
}

const SprintList = ({ sprints, currentSprintId }: Props) => {
    // const classes = useStyles();

    // Find unique dateTo years
    let sprintYears: Array<string> = [
        ...new Set([...sprints.values()].map((sprint) => moment(sprint.dateTo).format(YEAR_DATE_FORMAT))),
    ];

    // TODO: Style this component better, its ugly now
    // Or move this to an expandable list on hover of Sprint N title
    // TODO: replace this component with a calendar view
    return (
        <Box>
            <List>
                {/* <ListItem className={classes.bold}>Sprints in</ListItem> */}
                {/* <Divider component="li" /> */}
                {/* TODO: sort a map, remove _id from values */}
                <TreeView
                    // className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    defaultExpanded={[
                        sprintYears.length > 0 ? sprintYears.reduce((a, b) => (Number(a) > Number(b) ? a : b)) : '',
                    ]}
                >
                    {sprintYears
                        .sort((a, b) => Number(b) - Number(a))
                        .map((year, index) => (
                            <TreeItem key={`${year}-${index}`} nodeId={year} label={year}>
                                {[...sprints.values()]
                                    .filter((sprint) => moment(sprint.dateTo).format(YEAR_DATE_FORMAT) === year)
                                    .sort((a, b) => b.number - a.number)
                                    .map((sprint) => (
                                        <SprintListItem
                                            key={`sprint-${sprint.number}`}
                                            currentSprintId={currentSprintId}
                                            {...sprint}
                                        />
                                    ))}
                            </TreeItem>
                        ))}
                </TreeView>
            </List>
        </Box>
    );
};

export default SprintList;
