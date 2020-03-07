import React from 'react';
import moment from 'moment';
import sprintsService from '../services/sprintsService';
import SprintForm from '../components/forms/Sprint';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import { FORMIK_DATE_FORMAT } from '../utils/constants';
import NavBar from '../components/NavBar';
import '../styles/main.css';

const AddSprint = ({ user, push }) => (
    <React.Fragment>
        <NavBar user={user} />
        <SprintForm
            title="Add new sprint"
            initialValues={{
                number: 1,
                dateFrom: moment().format(FORMIK_DATE_FORMAT),
                dateTo: moment().format(FORMIK_DATE_FORMAT),
                title: '',
                body: '',
            }}
            onSubmit={data => {
                sprintsService.add(data).then(() => {
                    push('/sprints');
                });
            }}
        />
    </React.Fragment>
);

export default authenticatedPage(withPush(AddSprint));
