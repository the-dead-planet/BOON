import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import sprintsService from '../services/sprintsService';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import NavBar from '../components/NavBar';
import '../styles/main.css';

class EditSprint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFrom: Date.now(),
            dateTo: Date.now(),
            number: 1,
            title: '',
            body: '',
        };
        this.handleDateFromChange = this.handleDateFromChange.bind(this);
        this.handleDateToChange = this.handleDateToChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    // TODO: write this in a smarter way - split to components
    handleDateFromChange = event => {
        this.setState({
            dateFrom: event.target.value,
        });
    };

    handleDateToChange = event => {
        this.setState({
            dateTo: event.target.value,
        });
    };

    handleNumberChange = event => {
        this.setState({
            number: event.target.value,
        });
    };

    handleTitleChange = event => {
        this.setState({
            title: event.target.value,
        });
    };

    handleBodyChange = event => {
        this.setState({
            body: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <NavBar user={this.user} />
                <h1 className="center">Add Sprint</h1>
                <Formik
                    initialValues={{}}
                    onSubmit={data => {
                        sprintsService.add(data).then(() => {
                            this.props.push('/sprints');
                        });
                    }}
                >
                    {() => (
                        <Form>
                            <div className="center">
                                <p>
                                    Number
                                    <Field
                                        type="number"
                                        name="number"
                                        value={this.state.number}
                                        onChange={this.handleNumberChange}
                                    />
                                </p>
                                <p>
                                    Name
                                    <Field
                                        type="text"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleTitleChange}
                                    />
                                </p>
                                <p>
                                    Date From
                                    <Field
                                        type="date"
                                        name="dateFrom"
                                        value={this.state.dateFrom}
                                        onChange={this.handleDateFromChange}
                                    />
                                </p>
                                <p>
                                    Date From
                                    <Field
                                        type="date"
                                        name="dateTo"
                                        value={this.state.dateTo}
                                        onChange={this.handleDateToChange}
                                    />
                                </p>
                                <p>
                                    Description
                                    <Field
                                        type="text"
                                        name="body"
                                        value={this.state.body}
                                        onChange={this.handleBodyChange}
                                    />
                                </p>
                                <p>
                                    <button type="submit">Submit</button>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default authenticatedPage(withPush(EditSprint)); // TODO: repair this
// export default EditSprint;
