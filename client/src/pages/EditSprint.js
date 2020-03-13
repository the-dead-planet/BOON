import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SprintForm from '../components/forms/Sprint';
import moment from 'moment';
import sprintsService from '../services/sprintsService';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import { FORMIK_DATE_FORMAT } from '../utils/constants';
import AppLayout from '../layouts/AppLayout';
import { Loading } from '../components/Loading';
import withShowError from '../components/withShowError';

const EditSprint = ({ user, push, notificationsProps, showError }) => {
    const { id } = useParams();

    const [sprint, setSprint] = useState(null);

    const getSprint = async () => {
        const sprint = await sprintsService.getOne({ objectId: id }).catch(showError);
        setSprint(sprint);
    };

    useEffect(() => {
        if (!sprint) {
            getSprint();
        }
    });

    return (
        <AppLayout user={user} {...notificationsProps}>
            {!sprint ? (
                <Loading />
            ) : (
                <SprintForm
                    title={`Edit sprint ${sprint.number}`}
                    initialValues={{
                        number: sprint.number,
                        title: sprint.title,
                        dateFrom: moment(sprint.dateFrom).format(FORMIK_DATE_FORMAT),
                        dateTo: moment(sprint.dateTo).format(FORMIK_DATE_FORMAT),
                        body: sprint.body,
                    }}
                    onSubmit={data => {
                        sprintsService
                            .update({ ...data, objectId: id })
                            .then(() => {
                                push('/sprints');
                            })
                            .catch(showError);
                    }}
                />
            )}
        </AppLayout>
    );
};

export default authenticatedPage(withPush(EditSprint));
