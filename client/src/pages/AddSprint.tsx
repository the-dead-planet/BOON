import React from 'react';
import SprintForm from '../components/forms/Sprint';
// import { authenticatedPage } from '../utils/authenticatedPage';
import { Format } from '../constants/dateFormats';
import AppLayout from '../layouts/AppLayout';
// import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, ThemeType, SprintSubmit } from '../logic/types';
import { useServices } from '../services';
import * as Utils from '../utils';

interface Props {
    user: User;
    themeType: ThemeType;
    onThemeTypeChange: (themeType: ThemeType) => void;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
    push: (path: string) => void;
    notificationsProps: NotificationProps;
    showError: (err: Error) => void;
}

const AddSprint = ({ user, themeType, onThemeTypeChange, mode, onModeChange, push, notificationsProps, showError }: Props) => {
    const { sprintsService } = useServices()!;

    const nowFormatted = React.useMemo(() => Utils.DateTime.toFormat(new Date(), Format.FORMIK_DATE_FORMAT), [])

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            onThemeTypeChange={onThemeTypeChange}
            mode={mode}
            onModeChange={onModeChange}
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
                onSubmit={(data: { [key in string]: unknown }) => {
                    sprintsService
                        .add(data as unknown as SprintSubmit)
                        .then(() => {
                            push('/sprints');
                        })
                        .catch(showError);
                }}
            />
        </AppLayout>
    );
};

export default AddSprint;
// export default authenticatedPage(withShowError(AddSprint));
