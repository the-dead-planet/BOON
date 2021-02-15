import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import services from '../services/realImpl';
import PostForm from '../components/forms/Post';
import { authenticatedPage } from '../utils/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import AppLayout from '../layouts/AppLayout';
import { useParams } from 'react-router-dom';
import withShowError from '../utils/withShowError';
import { User, NotificationProps, Mode, PostSubmit, Sprint } from '../logic/types';

interface Props {
    user: User;
    mode: Mode;
    sprintId: string;
    setMode: any;
    push: any;
    notificationsProps: NotificationProps;
    showError: any;
}

interface Params {
    id: string;
}

const AddPost = ({ user, mode, setMode, sprintId, push, notificationsProps, showError }: Props) => {
    const { id } = useParams<Params>();

    const [sprint, setSprint] = useState<Sprint | null>(null);

    const { sprintsService, postsService } = services;

    const getSprint = async () => {
        const sprint = await sprintsService.getOne({ objectId: id }).catch(showError);
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
        <AppLayout user={user} mode={mode} setMode={setMode} {...notificationsProps}>
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
                        sprintId: id,
                        model: 'Sprint',
                    };
                    return postsService.add(extendedData).catch(showError);
                }}
            />
        </AppLayout>
    );
};

export default authenticatedPage(withPush(withShowError(AddPost)));
