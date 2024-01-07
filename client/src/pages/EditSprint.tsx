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
    setThemeType: any;
    mode: Mode;
    setMode: any;
    push: any;
    notificationsProps: NotificationProps;
    showError: any;
}

const EditSprint = ({ user, themeType, setThemeType, mode, setMode, push, notificationsProps, showError }: Props) => {
    const { id } = useParams<{
        id: string;
    }>();

    const [sprint, setSprint] = useState<Sprint | null>(null);

    const { sprintsService } = useServices()!;

    const getSprint = async () => {
        const sprint = await sprintsService.getOne({ objectId: id ?? '' }).catch(showError);
        setSprint(sprint);
    };

    useEffect(() => {
        if (!sprint) {
            getSprint();
        }
    });

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            setThemeType={setThemeType}
            mode={mode}
            setMode={setMode}
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
