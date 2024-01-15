import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PostForm from '../components/forms/Post';
import AppLayout from '../layouts/AppLayout';
import * as Types from '../logic/types';
import { useServices } from '../services';

interface Props {
    user: Types.User;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    mode: Types.Mode;
    sprintId: string;
    onModeChange: (mode: Types.Mode) => void;
    notificationsProps: Types.NotificationProps;
    showError: (err: Error) => void;
}

export const AddPost = ({
    user,
    themeType,
    onThemeTypeChange,
    mode,
    onModeChange,
    notificationsProps,
    showError,
}: Props) => {
    const params = useParams<{ id: string }>();
    const [sprint, setSprint] = useState<Types.Sprint | null>(null);
    const { sprintsService, postsService } = useServices()!;

    useEffect(() => {
        if (sprint && sprint._id === params.id) {
            return;
        }
        sprintsService.getOne({ objectId: params.id ?? '' })
            .then((sprint) => {
                if (sprint) {
                    setSprint(sprint);
                } else {
                    // TODO: err
                }
            })
            .catch(showError)
    }, [params.id]);

    const sprintNumber = useMemo(() => sprint ? sprint.number : -1, [sprint?.number]);

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            onThemeTypeChange={onThemeTypeChange}
            mode={mode}
            onModeChange={onModeChange}
            {...notificationsProps}
        >
            <PostForm
                mode={mode}
                title={sprint ? `Add post to sprint ${sprintNumber}` : `Add post`} // TODO: Null issue
                initialValues={{
                    project: '',
                    title: '',
                    body: '',
                }}
                onSubmit={(data: { [key in string]: unknown }) => {
                    const extendedData = {
                        ...data,
                        sprintId: params.id,
                        model: 'Sprint',
                    };
                    return postsService.add(extendedData as unknown as Types.PostData).catch(showError);
                }}
            />
        </AppLayout>
    );
};
