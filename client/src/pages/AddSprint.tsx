import { useMemo } from 'react';
import SprintForm from '../components/forms/Sprint';
import { Format } from '../constants/dateFormats';
import AppLayout from '../layouts/AppLayout';
import { useServices } from '../services';
import * as Types from '../logic/types';
import * as Utils from '../utils';

interface Props {
    user: Types.User;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    mode: Types.Mode;
    onModeChange: (mode: Types.Mode) => void;
    push: (path: string) => void;
    notificationsProps: Types.NotificationProps;
    showError: (err: Error) => void;
}

export const AddSprint = ({ user, themeType, onThemeTypeChange, mode, onModeChange, push, notificationsProps, showError }: Props) => {
    const { sprintsService } = useServices()!;
    const nowFormatted = useMemo(() => Utils.DateTime.toFormat(new Date(), Format.FORMIK_DATE_FORMAT), [])

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
                        .add(data as unknown as Types.SprintSubmit)
                        .then(() => {
                            push('/sprints');
                        })
                        .catch(showError);
                }}
            />
        </AppLayout>
    );
};
