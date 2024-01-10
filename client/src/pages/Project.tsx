import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { authenticatedPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
import { SingleProject } from '../components/project/SingleProject';
// import { WithShowErrorInjectedProps } from '../utils/withShowError';
import { User, Comment, NotificationProps, Mode, ThemeType, StateData, Project, RemoveObjectData, Sprint } from '../logic/types';
import { PATHS } from '../constants/data';
import { getRandomQuote } from '../utils/data';
import { useFetchData } from '../utils/useFetchData';
const { projects } = PATHS;
const projectsPath = projects;

// TODO: see a comment in `Logout` regarding HOCs.
interface SprintProps {
    user: User | undefined | null;
    themeType: ThemeType;
    onThemeTypeChange: (themeType: ThemeType) => void;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
    data: StateData;
    setStateData: (data: [Sprint[], Project[], User[]]) => void;
    addPostComment: (id: string, comment: Comment) => void;
    addSprintComment: (id: string, comment: Comment) => void;
    removeObject:  (obj: RemoveObjectData) => void;
    notificationsProps: NotificationProps;
    showError: (err: Error) => void;
}

const Project: React.FC<SprintProps> = ({
// const Project: React.FC<SprintProps & WithShowErrorInjectedProps> = ({
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
    const navProjects = [...projects.values()]?.map((project: Project) => ({
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
                path: projectsPath,
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

// const AuthenticatedProject = authenticatedPage(Project);

// export default AuthenticatedProject;
export default Project;
