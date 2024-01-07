import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { withFetchData } from '../utils/withFetchData';
import { authenticatedPage } from '../utils/authenticatedPage';
import AppLayout from '../layouts/AppLayout';
import { CommentsSection } from '../components/CommentsSection';
import { SingleSprint } from '../components/sprint/SingleSprint';
import { WithShowErrorInjectedProps } from '../utils/withShowError';
import {
    User,
    NotificationProps,
    Post as PostType,
    ThemeType,
    Mode,
    StateData,
    Sprint as SprintType,
    Comment,
    Model,
} from '../logic/types';
import { Format } from '../constants/dateFormats';
import { PATHS } from '../constants/data';
import { getRandomQuote } from '../utils/data';
import * as Utils from '../utils';
const { sprints } = PATHS;
const sprintsPath = sprints;

interface SprintProps {
    user: User | undefined | null;
    themeType: ThemeType;
    setThemeType: any;
    mode: Mode;
    setMode: any;
    data: StateData;
    addPostComment: any;
    addSprintComment: any;
    removeObject: any;
    notificationsProps: NotificationProps;
    setStateData: (...args: unknown[]) => void;
}

const Sprint: React.FC<SprintProps & WithShowErrorInjectedProps> = ({
    user,
    themeType,
    setThemeType,
    mode,
    setMode,
    data,
    addPostComment,
    addSprintComment,
    removeObject,
    notificationsProps,
}) => {
    const { id }= useParams<{ id: string }>();
    const { sprints, posts, comments, likes, users, projects } = data;

    const [quote, setQuote] = useState('');
    useEffect(() => {
        setQuote(getRandomQuote());
    }, [setQuote]);

    /* 
        GET CURRENT SPRINT ID DATA FROM APP STATE
    */
    const sprint = sprints.get(id ?? '');

    /*
        SORT SPRINTS FOR PAGINATION
    */
    const sortedSprints = sprints ? [...sprints.values()].sort((a, b) => b.number - a.number) : [];
    let currentInd = 0;
    sortedSprints.forEach((spr, i) => {
        if (spr._id === id) {
            currentInd = i;
        }
    });

    /* 
        NAVIGATION ITEMS
    */
    const sprintPosts = sprint?.posts;
    const navPosts = sprintPosts
        ?.map((postId) => posts.get(postId))
        .map((post) => ({ hash: true, id: post?._id || '', name: post?.title || '', path: `#${post?._id}` || '#' }));

    const navProjects = [
        ...new Set(
            sprintPosts
                ?.map((postId) =>
                    [...projects.values()].reduce((acc, project) => (project.posts.includes(postId) ? project : acc))
                )
                .map((project) => project._id)
        ),
    ].map((projectId) => ({
        id: projectId || '',
        name: projects.get(projectId)?.title || '',
        path: `/projects/${projectId}`,
    }));

    const navPlaceholder = [{ id: '', name: 'Printing...', path: '/' }];

    const [focusForComments, setFocusForComments] = useState<{ model: string; id: string } | null>(null);

    const toggleSprintComments = (toggle: boolean) => {
        if (!toggle) {
            setFocusForComments(null);
        } else {
            setFocusForComments({ model: 'Sprint', id: sprint!._id });
        }
    };

    const togglePostComments = (postId: string | null) => {
        if (postId === null) {
            setFocusForComments(null);
        } else {
            setFocusForComments({ model: 'Post', id: postId });
        }
    };

    const focusedElement: PostType | SprintType | null | undefined =
        focusForComments &&
        (focusForComments.model === 'Sprint' ? sprints.get(focusForComments.id) : posts.get(focusForComments.id));

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            setThemeType={setThemeType}
            mode={mode}
            setMode={setMode}
            appBar={true}
            quote={quote}
            pagination={{
                path: sprintsPath,
                currentId: id,
                nextId: currentInd > 0 ? sortedSprints[currentInd - 1]._id : undefined,
                previousId: currentInd < sortedSprints.length - 1 ? sortedSprints[currentInd + 1]._id : undefined,
                primary: `Sprint ${sprint?.number || ''}`,
                secondary: sprint?.dateTo ? Utils.DateTime.toFormat(sprint.dateTo, Format.MONTH_YEAR_FORMAT) : '',
                list: sprints
                    ? [...sprints.values()].map((spr: SprintType) => ({
                          name: spr?.title,
                          path: sprintsPath,
                          id: spr._id,
                          number: spr.number,
                      }))
                    : undefined,
            }}
            createButton={{ name: 'Create', onClick: () => '' }}
            navPanel={{
                side: 'left',
                content: [
                    { header: 'Highlights', list: navPosts || navPlaceholder },
                    // TODO: Get a list of projects related to the posts related to currently displayed sprint
                    { header: 'Related projects', list: navProjects || navPlaceholder },
                ],
            }}
            sideColumn={{
                header: '_goss',
                body:
                    'We heard that our favorite developer, Geek124, switched to GraphQL. Unbelievable. Can you believe it?',
            }}
            secondaryDrawer="a" // TODO: fill with comments from related object
            secondaryDrawerOpen={focusedElement != null}
            secondaryDrawerContent={
                focusForComments &&
                focusedElement && (
                    <CommentsSection
                        // expanded={true}
                        mode={mode}
                        user={user}
                        title={focusedElement.title}
                        parentId={focusedElement._id}
                        parentModel={focusForComments.model as Model}
                        comments={focusedElement.comments.map((c) => comments.get(c) as Comment)}
                        users={data.users}
                        addComment={
                            focusForComments.model === 'Sprint'
                                ? addSprintComment.bind(focusForComments.id)
                                : addPostComment.bind(focusForComments.id)
                        }
                        removeComment={(id: string) =>
                            removeObject({
                                child: 'comments',
                                childId: id,
                                parent: focusForComments.model === 'Sprint' ? 'sprints' : 'posts',
                                parentId: focusForComments.id,
                            })
                        }
                    />
                )
            }
            toggleSecondaryDrawer={toggleSprintComments}
            {...notificationsProps}
        >
            <SingleSprint
                user={user}
                themeType={themeType}
                sprint={sprint}
                posts={posts}
                projects={projects}
                comments={comments}
                likes={likes}
                users={users}
                addPostComment={addPostComment}
                removeObject={removeObject}
                toggleSprintComments={toggleSprintComments}
                togglePostComments={togglePostComments}
            />
        </AppLayout>
    );
};

export default authenticatedPage(withFetchData(Sprint));
