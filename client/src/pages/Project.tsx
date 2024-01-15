import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { SingleProject } from '../components/project/SingleProject';
import * as Types from '../logic/types';
import { PATHS } from '../constants/data';
import { getRandomQuote } from '../utils/data';
import { useFetchData } from '../hooks/useFetchData';
interface Props {
    user: Types.User | undefined | null;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    mode: Types.Mode;
    onModeChange: (mode: Types.Mode) => void;
    data: Types.StateData;
    setStateData: (data: [Types.Sprint[], Types.Project[], Types.User[]]) => void;
    addPostComment: (id: string, comment: Types.Comment) => void;
    addSprintComment: (id: string, comment: Types.Comment) => void;
    removeObject: (obj: Types.RemoveObjectData) => void;
    notificationsProps: Types.NotificationProps;
    showError: (err: Error) => void;
}

export const Project: React.FC<Props> = ({
    user,
    themeType,
    onThemeTypeChange,
    mode,
    onModeChange,
    data,
    addPostComment,
    removeObject,
    notificationsProps,
    showError,
    setStateData
}) => {
    const params = useParams<{ id: string }>();
    const { sprints: sprints, posts: posts, comments: comments, likes: likes, users: users, projects: projects } = data;

    const fetchedData = useFetchData(showError);

    useEffect(() => {
        if (!fetchedData) {
            return;
        }
        setStateData(fetchedData)
    }, [fetchedData, setStateData]);

    const [quote, setQuote] = useState('');
    useEffect(() => {
        setQuote(getRandomQuote());
    }, [setQuote]);

    /* 
        GET CURRENT SPRINT ID DATA FROM APP STATE
    */
    const project = projects.get(params.id!)!;

    /* 
        NAVIGATION ITEMS
    */
    const navProjects = [...projects.values()]?.map((project: Types.Project) => ({
        id: project._id || '',
        name: project.title || '',
        path: `/projects/${project._id}`,
    }));

    const navPlaceholder = [{ id: '', name: 'Printing...', path: '/' }];

    // TODO: handle like in Sprint.
    const toggleSecondaryDrawer = () => {
        /* noop */
    };

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            onThemeTypeChange={onThemeTypeChange}
            mode={mode}
            onModeChange={onModeChange}
            appBar={true}
            quote={quote}
            pagination={{
                path: PATHS.projects,
            }}
            navPanel={{
                side: 'left',
                content: [{ header: 'All projects', activeId: project?._id, list: navProjects || navPlaceholder }],
                variant: 'secondary',
            }}
            sideColumn={{
                header: '_news',
                body: `We found something on the internet which is related to ${project?.title}. "THEY" say that...`,
            }}
            secondaryDrawer="a" // TODO: fill with comments from related object
            secondaryDrawerOpen={false}
            secondaryDrawerContent={null}
            toggleSecondaryDrawer={toggleSecondaryDrawer}
            {...notificationsProps}
        >
            <SingleProject
                user={user}
                themeType={themeType}
                project={project}
                sprints={sprints}
                posts={posts}
                projects={projects}
                comments={comments}
                likes={likes}
                users={users}
                addPostComment={addPostComment}
                removeObject={removeObject}
                toggleCommentsPanel={toggleSecondaryDrawer}
                onError={showError}
            />
        </AppLayout>
    );
};
