import React from 'react';
import SprintForm from '../components/forms/Sprint';
import { authenticatedPage } from '../utils/authenticatedPage';
import { Format } from '../constants/dateFormats';
import AppLayout from '../layouts/AppLayout';
import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, ThemeType, SprintSubmit } from '../logic/types';
import { useServices } from '../services';
import * as Utils from '../utils';

interface Props {
    user: User;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
    push: any;
    notificationsProps: NotificationProps;
    showError: any;
}

const AddSprint = ({ user, themeType, setThemeType, mode, setMode, push, notificationsProps, showError }: Props) => {
    const { sprintsService } = useServices()!;

    const nowFormatted = React.useMemo(() => Utils.DateTime.toFormat(new Date(), Format.FORMIK_DATE_FORMAT), [])

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            setThemeType={setThemeType}
            mode={mode}
            setMode={setMode}
            {...notificationsProps}
        >
            <SprintForm
                mode={mode}
                title="Add new sprint"
                initialValues={{
                    number: 1,
                    dateFrom: nowFormatted,
                    dateTo: nowFormatted,
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
};

export default authenticatedPage(withShowError(AddSprint));
