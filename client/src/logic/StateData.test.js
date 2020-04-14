import { depopulate, initialState } from '../logic/StateData';
import { buildMap } from '../testing/builders';

describe('StateData', () => {
    describe('depopulate', () => {
        test('Author', () => {
            const state = initialState();
            const author = { _id: 'authorId' };
            expect(depopulate(author, [], state)).toBe(author);
            expect(state).toEqual(initialState());
        });

        test('Like', () => {
            const state = initialState();
            const like = { _id: 'likeId', author: { _id: 'authorId' } };
            expect(depopulate(like, ['author'], state)).toEqual({ _id: 'likeId', author: 'authorId' });
            expect(state).toEqual({
                ...initialState(),
                users: buildMap({ authorId: { _id: 'authorId' } }),
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
            expect(depopulate(comment, ['author', 'likes'], state)).toEqual({
                _id: 'commentId',
                body: 'commentBody',
                author: 'commentAuthorId',
                likes: ['likeAId', 'likeBId'],
            });
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
            });
        });
    });
});
