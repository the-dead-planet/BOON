import { depopulate, initialState, mergeStateData } from '../logic/StateData';
import { buildMap } from '../testing/builders';

describe('StateData', () => {
    describe('depopulate', () => {
        test('Author', () => {
            const state = initialState();
            const author = { _id: 'authorId' };
            expect(depopulate(author, 'author')).toEqual({
                ...initialState(),
                users: buildMap({ authorId: { _id: 'authorId' } }),
            });
        });

        test('Like', () => {
            const state = initialState();
            const like = { _id: 'likeId', author: { _id: 'authorId' } };
            expect(depopulate(like, 'likes')).toEqual({
                ...initialState(),
                users: buildMap({ authorId: { _id: 'authorId' } }),
                likes: buildMap({ likeId: { _id: 'likeId', author: 'authorId' } }),
            });
        });

        test('Comment with author and 2 likes', () => {
            const state = initialState();
            const comment = {
                _id: 'commentId',
                body: 'commentBody',
                author: {
                    _id: 'commentAuthorId',
                    username: 'commentAuthor',
                },
                likes: [
                    {
                        _id: 'likeAId',
                        type: 'Excited',
                        author: {
                            _id: 'likeAAuthorId',
                            username: 'likeAAuthor',
                        },
                    },
                    {
                        _id: 'likeBId',
                        type: 'Like',
                        author: {
                            _id: 'likeBAuthorId',
                            username: 'likeBAuthor',
                        },
                    },
                ],
            };
            expect(depopulate(comment, 'comments')).toEqual({
                ...initialState(),
                likes: buildMap({
                    likeAId: {
                        _id: 'likeAId',
                        author: 'likeAAuthorId',
                        type: 'Excited',
                    },
                    likeBId: {
                        _id: 'likeBId',
                        author: 'likeBAuthorId',
                        type: 'Like',
                    },
                }),

                users: buildMap({
                    likeAAuthorId: { _id: 'likeAAuthorId', username: 'likeAAuthor' },
                    likeBAuthorId: { _id: 'likeBAuthorId', username: 'likeBAuthor' },
                    commentAuthorId: { _id: 'commentAuthorId', username: 'commentAuthor' },
                }),

                comments: buildMap({
                    commentId: {
                        _id: 'commentId',
                        body: 'commentBody',
                        author: 'commentAuthorId',
                        likes: ['likeAId', 'likeBId'],
                    },
                }),
            });
        });
    });

    describe('mergeStateData', () => {
        test('two initial states', () => {
            expect(mergeStateData(initialState(), initialState())).toEqual(initialState());
        });

        test('disjoint', () => {
            expect(
                mergeStateData(
                    { ...initialState(), likes: buildMap({ likeId: { _id: 'likeId' } }) },
                    { ...initialState(), users: buildMap({ userId: { _id: 'userId' } }) }
                )
            ).toEqual({
                ...initialState(),
                likes: buildMap({ likeId: { _id: 'likeId' } }),
                users: buildMap({ userId: { _id: 'userId' } }),
            });
        });

        test('overlapping', () => {
            expect(
                mergeStateData(
                    { ...initialState(), likes: buildMap({ likeId: { _id: 'likeA' } }) },
                    { ...initialState(), likes: buildMap({ likeId: { _id: 'likeB' } }) }
                )
            ).toEqual({ ...initialState(), likes: buildMap({ likeId: { _id: 'likeB' } }) });
        });
    });
});
