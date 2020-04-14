import { depopulate, initialState } from '../logic/StateData';
import { buildMap } from '../testing/builders';

describe('StateData', () => {
    describe('depopulate', () => {
        test('Author', () => {
            const state = initialState();
            const author = { _id: 'authorId' };
            depopulate(author, 'author', state);
            expect(state).toEqual({ ...initialState(), users: buildMap({ authorId: { _id: 'authorId' } }) });
        });

        test('Like', () => {
            const state = initialState();
            const like = { _id: 'likeId', author: { _id: 'authorId' } };
            depopulate(like, 'likes', state);
            expect(state).toEqual({
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
            depopulate(comment, ['comments'], state);
            expect(state).toEqual({
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
});
