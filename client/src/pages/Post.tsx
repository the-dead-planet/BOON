import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import { useFetchData } from '../hooks/useFetchData';
import AppLayout from '../layouts/AppLayout';
import { CommentsSection } from '../components/CommentsSection';
import { SinglePost } from '../components/post/SinglePost';
import * as Types from '../logic/types';
import * as Hooks from '../hooks';
import * as AppState from '../app-state';
import { getRandomQuote } from '../utils/data';

export const Post: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const query = useQuery();
    let linkBack = query.get('from');
    const linkBackName = linkBack ? linkBack.substring(1, linkBack.substring(1).indexOf('/') + 1) : 'home';
    linkBack = linkBack || '/';

    const data = Hooks.useSubject(AppState.stateData$);
    const { sprints, posts, comments, likes, users, projects } = data;

    const [quote, setQuote] = useState('');
    useEffect(() => {
        setQuote(getRandomQuote());
    }, [setQuote]);

    useFetchData();

    const post = posts.get(id ?? '');

    // Store the minimal amount information necessary in the state.
    // It's obvious from the context that the comments displayed refer to the current post - no need to store
    // any metadata in the state.
    const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);

    const addComment = (id: string, comment: Types.Comment) => {
        AppState.addCommentToPost(id, comment);
    }
    const removeComment = (comment: Types.WithObjectId) => {
        AppState.removeObject({ child: 'comments', childId: comment.objectId, parent: 'posts', parentId: post!._id });
    }

    const styleInfo = { margin: '0, 5em' };

    return (
        <AppLayout
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
                        title={post.title}
                        parentId={post._id}
                        parentModel={'Post'}
                        comments={post.comments.map((c) => comments.get(c)).filter(Boolean) as unknown as Types.Comment[]}
                        users={data.users}
                        addComment={addComment}
                        removeComment={removeComment}
                    />
                )
            }
            toggleSecondaryDrawer={setIsCommentsDrawerOpen}
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
                    post={post}
                    sprints={sprints}
                    projects={projects}
                    comments={comments}
                    likes={likes}
                    users={users}
                    toggleCommentsPanel={setIsCommentsDrawerOpen}
                />
            )}
        </AppLayout>
    );
};
