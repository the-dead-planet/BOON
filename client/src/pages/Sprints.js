import React, { Component } from 'react';
import AppLayout from '../layouts/AppLayout';
import SprintsView from '../components/sprint/SprintsView';

// TODO: convert to a pure functional component (drop the class keyword).
class Sprints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sprintId: '',
            latestSprintId: '',
        };
        this.setSprintId = this.setSprintId.bind(this);
    }

    initializeSprint(sprints) {
        const latestSprintId =
            sprints.length > 0 ? [...sprints].sort((a, b) => new Date(b.dateTo) - new Date(a.dateTo))[0]._id : 0;
        // const latestSprintId = 0;

        this.setState({
            sprintId: latestSprintId,
        });
    }

    setSprintId(id) {
        this.setState({
            sprintId: id,
        });
    }

    render() {
        const { user, notificationsProps } = this.props;

        return (
            <AppLayout user={user} {...notificationsProps}>
                <SprintsView
                    user={this.props.user}
                    sprintId={this.state.sprintId}
                    onClick={id => this.setSprintId(id)}
                    initializeSprint={sprints => this.initializeSprint(sprints)}
                    onError={notificationsProps.addNotification}
                />
            </AppLayout>
        );
    }
}

export default Sprints;
