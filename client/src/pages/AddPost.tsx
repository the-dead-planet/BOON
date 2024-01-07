import { useState, useEffect } from 'react';
// import * as luxon from 'luxon';
import PostForm from '../components/forms/Post';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import AppLayout from '../layouts/AppLayout';
import { useParams } from 'react-router-dom';
import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, PostSubmit, Sprint, ThemeType } from '../logic/types';
import { useServices } from '../services';

interface Props {
    user: User;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    sprintId: string;
    setMode: any;
    push: any;
    notificationsProps: NotificationProps;
    showError: any;
}

const AddPost = ({
    user,
    themeType,
    setThemeType,
    mode,
    setMode,
    sprintId,
    push,
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
            setThemeType={setThemeType}
            mode={mode}
            setMode={setMode}
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
                onSubmit={(data: PostSubmit) => {
                    const extendedData = {
                        ...data,
                        sprintId: params.id,
                        model: 'Sprint',
                    };
                    return postsService.add(extendedData).catch(showError);
                }}
            />
        </AppLayout>
    );
};

export default authenticatedPage(withPush(withShowError(AddPost)));
