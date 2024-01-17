import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { SingleProject } from '../components/project/SingleProject';
import * as Types from '../logic/types';
import * as Routes from '../routes';
import { getRandomQuote } from '../utils/data';
import { useFetchData } from '../hooks/useFetchData';
import * as AppState from '../app-state';
import * as Hooks from '../hooks';

export const Project: React.FC = () => {
    const params = useParams<{ id: string }>();
    const data = Hooks.useSubject(AppState.stateData$)
    const { sprints: sprints, posts: posts, comments: comments, likes: likes, users: users, projects: projects } = data;

    const fetchedData = useFetchData();

    useEffect(() => {
        if (!fetchedData) {
            return;
        }
        const [sprints, projects, users] = fetchedData;
        AppState.setStateData(sprints, projects, users);
    }, [fetchedData]);

    const [quote, setQuote] = useState('');
    useEffect(() => {
        setQuote(getRandomQuote());
    }, [setQuote]);

    const project = projects.get(params.id!)!;

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
            appBar={true}
            quote={quote}
            pagination={{
                path: Routes.Types.RouterPaths.Projects,
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
        >
            <SingleProject
                project={project}
                sprints={sprints}
                posts={posts}
                projects={projects}
                comments={comments}
                likes={likes}
                users={users}
                toggleCommentsPanel={toggleSecondaryDrawer}
            />
        </AppLayout>
    );
};
