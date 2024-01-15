import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '../utils/useQuery';
import { useFetchData } from '../utils/useFetchData';
import AppLayout from '../layouts/AppLayout';
import { CommentsSection } from '../components/CommentsSection';
import { SinglePost } from '../components/post/SinglePost';
import * as Types from '../logic/types';
import { getRandomQuote } from '../utils/data';

interface Props {
    user: Types.User | undefined | null;
    themeType: Types.ThemeType;
    onThemeTypeChange: (themeType: Types.ThemeType) => void;
    mode: Types.Mode;
    onModeChange: (mode: Types.Mode) => void;
    data: Types.StateData;
    addPostComment: (id: string, comment: Types.Comment) => void;
    addSprintComment: (id: string, comment: Types.Comment) => void;
    removeObject:  (obj: Types.RemoveObjectData) => void;
    notificationsProps:Types. NotificationProps;
    backTo: { name: string; path: string };
    setStateData: (data: [Types.Sprint[], Types.Project[], Types.User[]]) => void;
}

export const Post: React.FC<Props> = ({
    user,
    mode,
    themeType,
    onThemeTypeChange,
    onModeChange,
    data,
    addPostComment,
    removeObject,
    notificationsProps,
    setStateData
}) => {
    const { id } = useParams<{ id: string }>();
    const query = useQuery();
    let linkBack = query.get('from');
    const linkBackName = linkBack ? linkBack.substring(1, linkBack.substring(1).indexOf('/') + 1) : 'home';
    linkBack = linkBack || '/';

    const { sprints, posts, comments, likes, users, projects } = data;

    const [quote, setQuote] = useState('');
    useEffect(() => {
        setQuote(getRandomQuote());
    }, [setQuote]);

    const fetchedData = useFetchData();

    useEffect(() => {
        if (!fetchedData) {
            return;
        }
        setStateData(fetchedData)
    }, [fetchedData, setStateData]);
    /* 
        GET CURRENT POST ID DATA FROM APP STATE
    */
    const post = posts.get(id ?? '');

    // Store the minimal amount information necessary in the state.
    // It's obvious from the context that the comments displayed refer to the current post - no need to store
    // any metadata in the state.
    const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);

    const removeComment = (comment: Types.WithObjectId) =>
        removeObject({ child: 'comments', childId: comment.objectId, parent: 'posts', parentId: post!._id });

    const styleInfo = { margin: '0, 5em' };

    return (
        <AppLayout
            user={user}
            themeType={themeType}
            onThemeTypeChange={onThemeTypeChange}
            mode={mode}
            onModeChange={onModeChange}
            appBar={true}
            quote={quote}
            pagination={{ path: '/posts' }}
            createButton={{ name: 'Create', onClick: () => '' }}
            navPanel={{
                side: 'left',
                content: [
                    { header: 'Navigation', list: [{ id: '', name: `Back to ${linkBackName}`, path: linkBack }] },
                ],
            }}
            sideColumn={
                post
                    ? {
                          header: 'written by',
                          // TODO: Add 'about me' to user properties and display it here, if not available generate random goss
                          body: 'author' in post ? `${users.get(post.author?._id ?? '')?.publicName}` : '',
                      }
                    : undefined
            }
            secondaryDrawer="a" // TODO: fill with comments from related object
            secondaryDrawerOpen={isCommentsDrawerOpen}
            secondaryDrawerContent={
                post &&
                isCommentsDrawerOpen && (
                    <CommentsSection
                        // expanded={true}
                        mode={mode}
                        user={user}
                        title={post.title}
                        parentId={post._id}
                        parentModel={'Post'}
                        comments={post.comments.map((c) => comments.get(c)).filter(Boolean) as unknown as Types.Comment[]}
                        users={data.users}
                        addComment={addPostComment}
                        removeComment={removeComment}
                    />
                )
            }
            toggleSecondaryDrawer={setIsCommentsDrawerOpen}
            {...notificationsProps}
        >
            {/* Render the layout even if no sprint can be shown. The user would see a blank screen otherwise. */}
            {!id ? (
                <div>I love to talk about nothing. It's the only thing I know anything about.</div>
            ) : !post ? (
                // TODO: differentiate between a wrong id and loading state - not yet known
                // TODO: Add nice loading animation
                <div style={styleInfo}>We haven't found what you were looking for...</div>
            ) : (
                // NOTE: when passing multiple props directly to the child, it's often useful not to unpack them and use the `...` operator
                <SinglePost
                    user={user}
                    themeType={themeType}
                    post={post}
                    sprints={sprints}
                    projects={projects}
                    comments={comments}
                    likes={likes}
                    users={users}
                    removeObject={removeObject}
                    toggleCommentsPanel={setIsCommentsDrawerOpen}
                />
            )}
        </AppLayout>
    );
};
