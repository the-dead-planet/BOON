import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SprintForm from '../components/forms/Sprint';
import { Format } from '../constants/dateFormats';
import AppLayout from '../layouts/AppLayout';
import { Loading } from '../components/Loading';
import { SprintSubmit, Sprint } from '../logic/types';
import { useServices } from '../services';
import * as Routes from '../routes';
import * as Utils from '../utils';
import * as AppState from '../app-state';

export const EditSprint: React.FC = () => {
    const params = useParams<{ id: string; }>();
    const [sprint, setSprint] = React.useState<Sprint | null>(null);
    const { sprintsService } = useServices()!;
    const navigate = useNavigate();

    React.useEffect(() => {
        if (sprint?._id === params.id) {
            return;
        }

        sprintsService.getOne({ objectId: params.id ?? '' })
            .then((s) => {
                if (s) { 
                    setSprint(s);
                } else {
                    AppState.notificationHandler.addNotification(`Could not get the sprint with ID ${params.id ?? ''}`)
                }
            })
            .catch((err) => {
                AppState.notificationHandler.addNotification(err.message ?? `Error getting sprint ${params.id ?? ''}`)
            })
    }, [params.id]);

    return (
        <AppLayout>
            {!sprint ? (
                <Loading />
            ) : (
                <SprintForm
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
                    onSubmit={(data) => {
                        sprintsService
                            .update({ ...(data as unknown as SprintSubmit), objectId: params.id ?? '' })
                            .then(() => {
                                navigate(Routes.Types.RouterPaths.Sprints);
                            })
                            .catch((err) => {
                                AppState.notificationHandler.addNotification(err.message ?? `Error editing sprint ${params.id ?? ''}`)
                            });
                    }}
                />
            )}
        </AppLayout>
    );
};
