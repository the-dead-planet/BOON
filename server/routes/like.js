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
    app.get('/api/likes', async (req, res) => {
        Like.find({})
            .then(likes => res.status(200).send(likes))
            .catch(err => res.status(500).send({ err }));
    });

    // INDEX - get one
    app.get(`/api/likes/:id`, async (req, res) => {
        Like.findById(req.params.id)
            .then(like => res.status(200).send(like))
            .catch(err => res.status(500).send({ err }));
    });

    // POST - add like only if it wasn't already given by that user
    app.post('/api/likes', middleware.isLoggedIn, (req, res, next) => {
        const { id, type, model } = req.body;
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
            .then(updatedObject => {
                updatedObject.likes.filter(like => {
                    like.author.username === user.username;
                }).length === 0
                    ? Like.create({
                          likedObject: {
                              model: model,
                              id: id,
                          },
                          type: type,
                          author: {
                              id: user._id,
                              username: user.username,
                          },
                      }).then(like => {
                          updatedObject.likes.push(like._id);
                          return updatedObject.save().then(() => like);
                      })
                    : null;
            })
            .then(like => {
                res.status(201).send({
                    error: false,
                    like,
                });
            })
            .catch(next);
    });

    /* 
        UPDATE
        Update like with new type
    */
    app.put('/api/likes/:id', middleware.checkLikeOwnership, (req, res) => {
        let like = {
            type: req.body.type,
        };

        Like.findByIdAndUpdate(req.params.id, like)
            .then(like => {
                like.save().then(() =>
                    res.status(202).send({
                        error: false,
                        like,
                    })
                );
            })
            .catch(err => res.status(500).send({ err }));
    });

    /* 
        Delete like 
        Delete References to this like ID from parent objects (Sprint, Post, Comment)
    */
    app.delete('/api/likes/:id', middleware.checkLikeOwnership, (req, res) => {
        const { id } = req.params;

        Like.findByIdAndDelete(id)
            .then(async like => {
                if (like) {
                    const updatedObject = await models[like.likedObject.model]
                        .findByIdAndUpdate(
                            like.likedObject.id,
                            { $pull: { likes: new mongoose.Types.ObjectId(id) } },
                            { new: true }
                        )
                        .catch(err =>
                            res.status(404).send({
                                error: 'Not found',
                            })
                        );

                    res.status(202).send({
                        error: false,
                        like,
                        updatedObject,
                    });
                } else {
                    res.status(404).send({
                        error: `Like ${id} not found`,
                    });
                }
            })
            .catch(err => res.status(500).send({ err }));
    });
};
