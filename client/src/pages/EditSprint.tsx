import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SprintForm from '../components/forms/Sprint';
import { authenticatedPage } from '../utils/authenticatedPage';
import { Format } from '../constants/dateFormats';
import AppLayout from '../layouts/AppLayout';
import { Loading } from '../components/Loading';
// import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, SprintSubmit, Sprint, ThemeType } from '../logic/types';
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

const EditSprint = ({ user, themeType, onThemeTypeChange, mode, onModeChange, push, notificationsProps, showError }: Props) => {
    const { id } = useParams<{
        id: string;
    }>();

    const [sprint, setSprint] = useState<Sprint | null>(null);

    const { sprintsService } = useServices()!;

    const getSprint = async () => {
        sprintsService.getOne({ objectId: id ?? '' }).then(setSprint).catch(showError);
    };

    useEffect(() => {
        if (!sprint) {
            getSprint();
        }
    }, []);

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            onThemeTypeChange={onThemeTypeChange}
            mode={mode}
            onModeChange={onModeChange}
            {...notificationsProps}
        >
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
                        dateFrom: Utils.DateTime.toFormat(sprint.dateFrom, Format.FORMIK_DATE_FORMAT),
                        dateTo: Utils.DateTime.toFormat(sprint.dateTo, Format.FORMIK_DATE_FORMAT),
                        body: sprint.body,
                    }}
                    onSubmit={(data: SprintSubmit) => {
                        sprintsService
                            .update({ ...data, objectId: id ?? '' })
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

export default authenticatedPage(EditSprint);
