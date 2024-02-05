import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/forms/Post';
import AppLayout from '../layouts/AppLayout';
import { useServices } from '../services';
import * as Types from '../logic/types';
import * as Routes from '../routes';
import * as AppState from '../app-state';

let submitAbortController = new AbortController();

export const AddPost: React.FC = () => {
    const params = useParams<{ id: string }>();
    const [sprint, setSprint] = React.useState<Types.Sprint | null>(null);
    const { sprintsService, postsService } = useServices()!;
    const navigate = useNavigate();

    React.useEffect(() => {
        if (sprint && sprint._id === params.id) {
            return;
        }
        const abortController = new AbortController();

        sprintsService.getOne({ objectId: params.id ?? '' }, abortController.signal)
            .then((sprint) => {
                if (sprint) {
                    setSprint(sprint);
                } else {
                    AppState.notificationHandler.addNotification(`Could not find the sprint with ID ${params.id ?? ''}.`);
                }
            })
            .catch((err) => {
                AppState.notificationHandler.addNotification(err.message ?? `Unexpected error when fetching sprint ${params.id ?? ''}.`);
            });

        return () => {
            abortController.abort();
        };
    }, [params.id]);

    const sprintNumber = React.useMemo(() => sprint ? sprint.number : -1, [sprint?.number]);

    return (
        <AppLayout>
            <PostForm
                title={sprint ? `Add post to sprint ${sprintNumber}` : `Add post`} // TODO: Null issue
                initialValues={{
                    project: '',
                    title: '',
                    content: '',
                }}
                onSubmit={(data: { [key in string]: unknown; }) => {
                    submitAbortController.abort();
                    submitAbortController = new AbortController();
                    const extendedData = {
                        ...data,
                        sprintId: params.id,
                        model: 'Sprint',
                    };
                    postsService.add(extendedData as unknown as Types.PostData, submitAbortController.signal)
                        .then(() => {
                            navigate(Routes.Types.RouterPaths.Sprints);
                        })
                        .catch((err) => {
                            AppState.notificationHandler.addNotification(err.message ?? `Error adding post to sprint ${params.id ?? ''}.`)
                        });
                }}
            />
        </AppLayout>
    );
};
