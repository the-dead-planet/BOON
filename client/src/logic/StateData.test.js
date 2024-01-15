// import { depopulate, initialState, mergeStateData } from '../logic/StateData';
// import { buildMap } from '../testing/builders';

// describe('StateData', () => {
//     describe('depopulate', () => {
//         test('Author', () => {
//             const state = getInitialData();
//             const author = { _id: 'authorId' };
//             expect(depopulate(author, 'author')).toEqual({
//                 ...getInitialData(),
//                 users: buildMap({ authorId: { _id: 'authorId' } }),
//             });
//         });

//         test('Like', () => {
//             const state = getInitialData();
//             const like = { _id: 'likeId', author: { _id: 'authorId' } };
//             expect(depopulate(like, 'likes')).toEqual({
//                 ...getInitialData(),
//                 users: buildMap({ authorId: { _id: 'authorId' } }),
//                 likes: buildMap({ likeId: { _id: 'likeId', author: 'authorId' } }),
//             });
//         });

//         test('Comment with author and 2 likes', () => {
//             const state = getInitialData();
//             const comment = {
//                 _id: 'commentId',
//                 body: 'commentBody',
//                 author: {
//                     _id: 'commentAuthorId',
//                     username: 'commentAuthor',
//                 },
//                 likes: [
//                     {
//                         _id: 'likeAId',
//                         type: 'Excited',
//                         author: {
//                             _id: 'likeAAuthorId',
//                             username: 'likeAAuthor',
//                         },
//                     },
//                     {
//                         _id: 'likeBId',
//                         type: 'Like',
//                         author: {
//                             _id: 'likeBAuthorId',
//                             username: 'likeBAuthor',
//                         },
//                     },
//                 ],
//             };
//             expect(depopulate(comment, 'comments')).toEqual({
//                 ...getInitialData(),
//                 likes: buildMap({
//                     likeAId: {
//                         _id: 'likeAId',
//                         author: 'likeAAuthorId',
//                         type: 'Excited',
//                     },
//                     likeBId: {
//                         _id: 'likeBId',
//                         author: 'likeBAuthorId',
//                         type: 'Like',
//                     },
//                 }),

//                 users: buildMap({
//                     likeAAuthorId: { _id: 'likeAAuthorId', username: 'likeAAuthor' },
//                     likeBAuthorId: { _id: 'likeBAuthorId', username: 'likeBAuthor' },
//                     commentAuthorId: { _id: 'commentAuthorId', username: 'commentAuthor' },
//                 }),

//                 comments: buildMap({
//                     commentId: {
//                         _id: 'commentId',
//                         body: 'commentBody',
//                         author: 'commentAuthorId',
//                         likes: ['likeAId', 'likeBId'],
//                     },
//                 }),
//             });
//         });
//     });

//     describe('mergeStateData', () => {
//         test('two initial states', () => {
//             expect(mergeStateData(getInitialData(), getInitialData())).toEqual(getInitialData());
//         });

//         test('disjoint', () => {
//             expect(
//                 mergeStateData(
//                     { ...getInitialData(), likes: buildMap({ likeId: { _id: 'likeId' } }) },
//                     { ...getInitialData(), users: buildMap({ userId: { _id: 'userId' } }) }
//                 )
//             ).toEqual({
//                 ...getInitialData(),
//                 likes: buildMap({ likeId: { _id: 'likeId' } }),
//                 users: buildMap({ userId: { _id: 'userId' } }),
//             });
//         });

//         test('overlapping', () => {
//             expect(
//                 mergeStateData(
//                     { ...getInitialData(), likes: buildMap({ likeId: { _id: 'likeA' } }) },
//                     { ...getInitialData(), likes: buildMap({ likeId: { _id: 'likeB' } }) }
//                 )
//             ).toEqual({ ...getInitialData(), likes: buildMap({ likeId: { _id: 'likeB' } }) });
//         });
//     });
// });
