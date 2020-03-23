const mongoose = require('mongoose');
const middleware = require('../middleware');
const errors = require('../common/errors');
const models = require('../common/models');
const Post = mongoose.model('Post');
const Sprint = mongoose.model('Sprint');
const Like = mongoose.model('Like');

module.exports = app => {
    // INDEX - get all
    app.get(`/api/posts`, async (req, res) => {
        Post.find({})
            .populate({
                path: 'author comments likes',
                populate: {
                    path: 'author comments likes',
                    populate: {
                        path: 'author comments likes',
                        populate: {
                            path: 'author',
                        },
                    },
                },
            })
            .exec()
            .then(posts => res.status(200).send(posts))
            .catch(err => res.status(500).send({ err }));
    });

    // INDEX - Get one
    app.get(`/api/posts/:id`, async (req, res) => {
        Post.findById(req.params.id)
            .populate({
                path: 'author comments likes',
                populate: {
                    path: 'author comments likes',
                    populate: {
                        path: 'author comments likes',
                        populate: {
                            path: 'author',
                        },
                    },
                },
            })
            .exec()
            .then(post => res.status(200).send(post))
            .catch(err => res.status(500).send({ err }));
    });

    /*
        Create new post
        Add post id reference to sprint.posts array
    */
    app.post('/api/posts', middleware.isLoggedIn, (req, res, next) => {
        // TODO: either remove the `model` field, or handle other models as well
        const { sprintId, project, title, body, model } = req.body;
        const user = req.user;

        Sprint.findById(sprintId)
            .exec()
            .then(sprint => {
                if (!sprint) {
                    return Promise.reject(new errors.NotFoundError('sprintId', sprintId));
                } else {
                    return sprint;
                }
            })
            .then(sprint =>
                Post.create({
                    title: title,
                    body: body,
                    author: {
                        id: user._id,
                        username: user.username,
                    },
                }).then(post => {
                    sprint.posts.push(post._id);
                    // TODO: find project by id and also project.posts.push(post._id)
                    return sprint.save().then(() => post);
                })
            )
            .then(post => {
                res.status(201).send({
                    error: false,
                    post,
                });
            })
            .catch(next);
    });

    /* 
        UPDATE
        Update post with values from user form
        Add/replace 'edited' date with today
    */
    app.put('/api/posts/:id', middleware.checkPostOwnership, (req, res) => {
        let post = {
            title: req.body.title,
            body: req.body.body,
            edited: Date.now(),
        };

        Post.findByIdAndUpdate(req.params.id, post)
            .then(post => {
                post.save().then(() =>
                    res.status(202).send({
                        error: false,
                        post,
                    })
                );
            })
            .catch(err => res.status(500).send({ err }));
    });

    /* 
        Delete post 
        Delete children of this object (Comments, Likes)
        Delete References to this post ID from parent objects (Sprint)
    */
    app.delete('/api/posts/:id', middleware.checkPostOwnership, (req, res) => {
        const { id } = req.params;

        Post.findByIdAndDelete(id)
            .then(async post => {
                if (post) {
                    const comments = await Comment.deleteMany({ _id: post.comments }).catch(err =>
                        res.status(500).send({ err })
                    );

                    const likes = await Like.deleteMany({ _id: post.likes }).catch(err =>
                        res.status(500).send({ err })
                    );

                    // TODO: search all sprints and its posts by post._id
                    const updatedObject = models[post.postedToObject.model]
                        .findByIdAndUpdate(
                            post.postedToObject.id,
                            { $pull: { posts: new mongoose.Types.ObjectId(id) } },
                            { new: true }
                        )
                        .catch(err =>
                            res.status(404).send({
                                error: 'Not found',
                            })
                        );

                    res.status(202).send({
                        error: false,
                        post,
                        comments,
                        likes,
                        updatedObject,
                    });
                } else {
                    res.status(500).send({
                        error: `Post ${id} not found`,
                    });
                }
            })
            .catch(err => res.status(500).send({ err }));
    });
};
