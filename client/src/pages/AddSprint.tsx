import React from 'react';
import { useNavigate } from 'react-router-dom';
import SprintForm from '../components/forms/Sprint';
import { Format } from '../constants/dateFormats';
import AppLayout from '../layouts/AppLayout';
import { useServices } from '../services';
import * as Types from '../logic/types';
import * as Utils from '../utils';
import * as AppState from '../app-state';

export const AddSprint: React.FC = () => {
    const { sprintsService } = useServices()!;
    const nowFormatted = React.useMemo(() => Utils.DateTime.toFormat(new Date(), Format.FORMIK_DATE_FORMAT), []);
    const navigate = useNavigate();

    return (
        <AppLayout >
            <SprintForm
                title="Add new sprint"
                initialValues={{
                    number: 1,
                    dateFrom: nowFormatted,
                    dateTo: nowFormatted,
                    title: '',
                    body: '',
                }}
                onSubmit={(data: { [key in string]: unknown }) => {
                    sprintsService
                        .add(data as unknown as Types.SprintSubmit)
                        .then(() => {
                            navigate('/sprints');
                        })
                        .catch((err) => {
                            AppState.notificationHandler.addNotification(err.message ?? '')
                        });
                }}
            />
        </AppLayout>
    );
};
