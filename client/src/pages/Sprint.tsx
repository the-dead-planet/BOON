import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../hooks/useFetchData';
import AppLayout from '../layouts/AppLayout';
import { CommentsSection } from '../components/CommentsSection';
import { SingleSprint } from '../components/sprint/SingleSprint';
import { Format } from '../constants/dateFormats';
import { getRandomQuote } from '../utils/data';
import * as Routes from '../routes';
import * as Types from '../logic/types';
import * as Utils from '../utils';
import * as Hooks from '../hooks';
import * as AppState from '../app-state';

const navPlaceholder = [{ id: '', name: 'Printing...', path: '/' }];

export const Sprint: React.FC = () => {
    useFetchData();
    const params = useParams<{ id: string }>();
    const { sprints, posts, comments, likes, users, projects } = Hooks.useSubject(AppState.stateData$);
    const [focusForComments, setFocusForComments] = React.useState<{ model: string; id: string } | null>(null);
    console.log(sprints);

    const quote= React.useMemo(
        () => getRandomQuote(), 
        []
    );

    const sprint = React.useMemo(
        () => sprints.get(params.id ?? ''), 
        [sprints, params.id]
    );

    const sortedSprints = React.useMemo(
        () => sprints ? [...(sprints ?? []).values()].sort((a, b) => b.number - a.number) : [], 
        [sprints]
    );

    const currentInd = React.useMemo(
        () => sortedSprints.findIndex((el) => el._id === params.id), 
        [sortedSprints, params.id]
    );

    const navPosts = React.useMemo(
        () => sprint?.posts
            ?.map((postId) => posts.get(postId))
            .map((post) => ({ 
                hash: true, 
                id: post?._id || '', 
                name: post?.title || '', 
                path: `#${post?._id}` || '#' 
            })),
        [sprint, posts]
    );

    const navProjects = React.useMemo(
        () => {
            const uniqueProjectIds: string[] = [...new Set(sprint?.posts
                ?.map((postId) => [...projects.values()].reduce((acc, project) => project.posts.includes(postId) ? project : acc))
                .map((project) => project._id))];

            return uniqueProjectIds.map((projectId) => ({
                id: projectId || '',
                name: projects.get(projectId)?.title || '',
                path: `/projects/${projectId}`,
            }));
        },
        [sprint, projects]
    );


    const toggleSprintComments = React.useCallback(
        (toggle: boolean) => setFocusForComments(toggle ? { model: 'Sprint', id: sprint!._id } : null),
        [sprint?._id]
    );

    const togglePostComments = React.useCallback(
        (postId: string | null) => setFocusForComments(postId !== null ? { model: 'Post', id: postId } : null),
        []
    );

    const focusedElement = React.useMemo(
        (): Types.Post | Types.Sprint | null | undefined => {
            if (!focusForComments) {
                return;
            }
            return focusForComments.model === 'Sprint'
                ? sprints.get(focusForComments.id)
                : posts.get(focusForComments.id);
        },
        [focusForComments, sprints, posts]
    );

    return (
        <AppLayout
            appBar={true}
            quote={quote}
            pagination={{
                path: Routes.Types.RouterPaths.Sprints,
                currentId: params.id,
                nextId: currentInd > 0 ? sortedSprints[currentInd - 1]._id : undefined,
                previousId: currentInd < sortedSprints.length - 1 ? sortedSprints[currentInd + 1]._id : undefined,
                primary: `Sprint ${sprint?.number || ''}`,
                secondary: sprint?.dateTo ? Utils.DateTime.toFormat(sprint.dateTo, Format.MONTH_YEAR_FORMAT) : '',
                list: sprints
                    ? [...sprints.values()].map((spr: Types.Sprint) => ({
                        name: spr?.title,
                        path: Routes.Types.RouterPaths.Sprints,
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
                        title={focusedElement.title}
                        parentId={focusedElement._id}
                        parentModel={focusForComments.model as Types.Model}
                        comments={focusedElement.comments.map((c) => comments.get(c) as Types.Comment)}
                        users={users}
                        addComment={focusForComments.model === 'Sprint'
                                ? (id: string, comment: Types.Comment) => AppState.addCommentToSprint(id, comment)
                                : (id: string, comment: Types.Comment) => AppState.addCommentToPost(id, comment)}
                        removeComment={(comment: Types.WithObjectId) =>
                            AppState.removeObject({
                                child: 'comments',
                                childId: comment.objectId,
                                parent: focusForComments.model === 'Sprint' ? 'sprints' : 'posts',
                                parentId: focusForComments.id,
                            })
                        }
                    />
                )
            }
            toggleSecondaryDrawer={toggleSprintComments}
        >
            <SingleSprint
                sprint={sprint}
                posts={posts}
                projects={projects}
                comments={comments}
                likes={likes}
                users={users}
                toggleSprintComments={toggleSprintComments}
                togglePostComments={togglePostComments}
            />
        </AppLayout>
    );
};
