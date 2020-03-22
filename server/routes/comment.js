const mongoose = require('mongoose');
const middleware = require('../middleware');
const errors = require('../common/errors');
const models = require('../common/models');
const Comment = mongoose.model('Comment');
const Sprint = mongoose.model('Sprint');
const Post = mongoose.model('Post');
const Like = mongoose.model('Like');

module.exports = app => {
    // INDEX - get all
    app.get('/api/comments', async (req, res) => {
        Comment.find({})
            .then(comments => res.status(200).send(comments))
            .catch(err => res.status(500).send({ err }));
    });

    // INDEX - get one
    app.get(`/api/posts/:id`, async (req, res) => {
        Comment.findById(req.params.id)
            .then(comment => res.status(200).send(comment))
            .catch(err => res.status(500).send({ err }));
    });

    // POST
    app.post('/api/comments', middleware.isLoggedIn, (req, res, next) => {
        const { id, body, model } = req.body;
        const user = req.user;

        models[model]
            .findById(id)
            .exec()
            .then(updatedObject => {
                if (!updatedObject) {
                    return Promise.reject(new errors.NotFoundError('sprintId', id));
                } else {
                    return updatedObject;
                }
            })
            .then(updatedObject =>
                Comment.create({
                    body: body,
                    author: user._id,
                }).then(comment => {
                    updatedObject.comments.push(comment._id);
                    return updatedObject.save().then(() => comment);
                })
            )
            .then(comment => {
                res.status(201).send({
                    error: false,
                    comment,
                });
            })
            .catch(next);
    });

    /* 
        UPDATE
        Update comment with values from user form
        Add/replace 'edited' date with today
    */
    app.put('/api/comments/:id', middleware.checkCommentOwnership, (req, res) => {
        let comment = {
            body: req.body.body,
            edited: Date.now(),
        };

        Comment.findByIdAndUpdate(req.params.id, comment)
            .then(comment => {
                comment.save().then(() =>
                    res.status(202).send({
                        error: false,
                        comment,
                    })
                );
            })
            .catch(err => res.status(500).send({ err }));
    });

    /* 
        Delete comment 
        Delete children of this object (Likes)
        Delete References to this comment ID from parent objects (Sprint, Post)
    */
    app.delete('/api/comments/:id', middleware.checkCommentOwnership, (req, res) => {
        const { id } = req.params;

        Comment.findByIdAndDelete(id)
            .then(async comment => {
                if (comment) {
                    const likes = await Like.deleteMany({ _id: comment.likes }).catch(err =>
                        res.status(500).send({ err })
                    );

                    // TODO: search all 'commentable' objects (Sprint, Post), maybe store in a separate file as a constant
                    const updatedObject = await models[comment.commentedObject.model]
                        .findByIdAndUpdate(
                            comment.commentedObject.id,
                            { $pull: { comments: new mongoose.Types.ObjectId(id) } },
                            { new: true }
                        )
                        .catch(err =>
                            res.status(404).send({
                                error: 'Not found',
                            })
                        );

                    res.status(202).send({
                        error: false,
                        comment,
                        likes,
                        updatedObject,
                    });
                } else {
                    res.status(404).send({
                        error: `Comment ${id} not found`,
                    });
                }
            })
            .catch(err => res.status(500).send({ err }));
    });
};
