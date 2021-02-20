import React from 'react';
import moment from 'moment';
import sprintsService from '../services/sprintsService';
import SprintForm from '../components/forms/Sprint';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import { FORMIK_DATE_FORMAT } from '../constants/dateFormats';
import AppLayout from '../layouts/AppLayout';
import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, ThemeType, SprintSubmit } from '../logic/types';

interface Props {
    user: User;
    themeType: ThemeType;
    mode: Mode;
    setMode: any;
    push: any;
    notificationsProps: NotificationProps;
    showError: any;
}

const AddSprint = ({ user, themeType, mode, setMode, push, notificationsProps, showError }: Props) => (
    <AppLayout user={user} themeType={themeType} mode={mode} setMode={setMode} {...notificationsProps}>
        <SprintForm
            mode={mode}
            title="Add new sprint"
            initialValues={{
                number: 1,
                dateFrom: moment().format(FORMIK_DATE_FORMAT),
                dateTo: moment().format(FORMIK_DATE_FORMAT),
                title: '',
                body: '',
            }}
            onSubmit={(data: SprintSubmit) => {
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
