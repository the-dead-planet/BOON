import { useState, useEffect } from 'react';
// import * as luxon from 'luxon';
import PostForm from '../components/forms/Post';
// import { authenticatedPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
import { useParams } from 'react-router-dom';
// import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, Sprint, ThemeType, PostData } from '../logic/types';
import { useServices } from '../services';

interface Props {
    user: User;
    themeType: ThemeType;
    onThemeTypeChange: (themeType: ThemeType) => void;
    mode: Mode;
    sprintId: string;
    onModeChange: (mode: Mode) => void;
    // push: (path: string) => void;
    notificationsProps: NotificationProps;
    showError: (err: Error) => void;
}

const AddPost = ({
    user,
    themeType,
    onThemeTypeChange,
    mode,
    onModeChange,
    notificationsProps,
    showError,
}: Props) => {
    const params = useParams<{ id: string }>();

    const [sprint, setSprint] = useState<Sprint | null>(null);

    const { sprintsService, postsService } = useServices()!;

    const getSprint = async () => {
        const sprint = await sprintsService.getOne({ objectId: params.id ?? '' }).catch(showError);
        if (sprint) {
            setSprint(sprint);
        }
    };

    useEffect(() => {
        if (!sprint) {
            getSprint();
        }
    });

    const sprintNumber = sprint ? sprint.number : -1;

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
                    return postsService.add(extendedData as unknown as PostData).catch(showError);
                }}
            />
        </AppLayout>
    );
};

export default AddPost;
// export default authenticatedPage(withShowError(AddPost));
