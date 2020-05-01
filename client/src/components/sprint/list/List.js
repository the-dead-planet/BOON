import React from 'react';
import { useStyles } from '../../../styles/main';
import { Box } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SprintListItem from './ListItem';
import moment from 'moment';
import { YEAR_DATE_FORMAT } from '../../../utils/constants';

const SprintList = ({ sprints, currentSprintId }) => {
    const classes = useStyles();

    // Find unique dateTo years
    let sprintYears = [];
    let maxYear = '';

    if (sprints && sprints.size > 0) {
        sprintYears = [...sprints.values()].reduce((years, sprint) => {
            years = Array.isArray(years) ? years : [];
            let year = moment(sprint.dateTo).format(YEAR_DATE_FORMAT);
            if (!years.includes(year)) {
                years.push(year);
            }
            return years;
        });
    }

    return (
        <Box>
            <List>
                <ListItem>DVLPMNTS</ListItem>
                {/* <Divider component="li" /> */}
                {/* TODO: sort a map, remove _id from values */}
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    // defaultExpanded={[sprintYears.length > 0 ? sprintYears.reduce((a,b) => a > b ? a : b) : null]}
                    //    expanded={sprints.length > 0 ? [moment(sprints.get(currentSprintId).dateTo).format(YEAR_DATE_FORMAT)] : []}
                    defaultExpanded={['2019', '2020']} // TODO repair weird behavior, default is not updated with state update
                >
                    {sprintYears
                        .sort((a, b) => b - a)
                        .map((year, index) => (
                            <TreeItem key={`${year}-${index}`} nodeId={year} label={<Typography>{year}</Typography>}>
                                {[...sprints.values()]
                                    .filter(sprint => moment(sprint.dateTo).format(YEAR_DATE_FORMAT) === year)
                                    .sort((a, b) => b.number - a.number)
                                    .map(sprint => (
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
