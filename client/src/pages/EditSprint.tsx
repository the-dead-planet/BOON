import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SprintForm from '../components/forms/Sprint';
import moment from 'moment';
import sprintsService from '../services/sprintsService';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import { FORMIK_DATE_FORMAT } from '../constants/dateFormats';
import AppLayout from '../layouts/AppLayout';
import { Loading } from '../components/Loading';
// import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, SprintSubmit, Sprint } from '../logic/types';

interface Props {
    user: User;
    mode: Mode;
    setMode: any;
    push: any;
    notificationsProps: NotificationProps;
    showError: any;
}

interface Params {
    id: string;
}

const EditSprint = ({ user, mode, setMode, push, notificationsProps, showError }: Props) => {
    const { id } = useParams<Params>();

    const [sprint, setSprint] = useState<Sprint | null>(null);

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
        <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
            {!sprint ? (
                <Loading />
            ) : (
                <SprintForm
                    mode={mode}
                    title={`Edit sprint ${sprint.number}`}
                    // TODO: Solve the possibly 'null' error.
                    // Assure that sprint is either of type Sprint or undefined and use sprint?.number (optional chaining ES2020)
                    initialValues={{
                        number: sprint.number,
                        title: sprint.title,
                        dateFrom: moment(sprint.dateFrom).format(FORMIK_DATE_FORMAT),
                        dateTo: moment(sprint.dateTo).format(FORMIK_DATE_FORMAT),
                        body: sprint.body,
                    }}
                    onSubmit={(data: SprintSubmit) => {
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
