import React from 'react';
import moment from 'moment';
import sprintsService from '../services/sprintsService';
import SprintForm from '../components/forms/Sprint';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import { FORMIK_DATE_FORMAT } from '../utils/constants';
import AppLayout from '../layouts/AppLayout';
import withShowError from '../components/withShowError';

const AddSprint = ({ user, push, notificationsProps, showError }) => (
    <AppLayout user={user} {...notificationsProps}>
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
                sprintsService
                    .add(data)
                    .then(() => {
                        push('/sprints');
                    })
                    .catch(showError);
            }}
        />
    </AppLayout>
);

export default authenticatedPage(withPush(withShowError(AddSprint)));
