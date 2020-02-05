const mongoose = require('mongoose');
const middleware = require('../middleware');
const errors = require('../common/errors');
const models = require('../common/models');
const Comment = mongoose.model('Comment');
const Sprint = mongoose.model('Sprint');
const Post = mongoose.model('Post');
const Like = mongoose.model('Like');

module.exports = app => {
    // INDEX
    app.get('/api/likes', async (req, res) => {
        Like.find({})
            .then(likes => res.status(200).send(likes))
            .catch(err => res.status(500).send({ err }));
    });

    app.get('/api/likes/:id', async (req, res) => {
        Like.find({ _id: req.params.id })
            .then(likes => res.status(200).send(likes))
            .catch(err => res.status(500).send({ err }));
    });

    // POST
    app.post('/api/likes', middleware.isLoggedIn, (req, res, next) => {
        const { sprintId, body, created, model } = req.body;
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
                Like.create({
                    likedObject: {
                        model: model,
                        id: sprintId,
                    },
                    body: body,
                    author: {
                        id: user._id,
                        username: user.username,
                    },
                    created,
                }).then(like => {
                    sprint.likes.push(like._id);
                    return sprint.save().then(() => like);
                })
            )
            .then(like => {
                res.status(201).send({
                    error: false,
                    like,
                });
            })
            .catch(next);
    });

    // // UPDATE
    // app.put("/api/comments/:id", middleware.checkSprintOwnership, (req, res) => {
    //     Comment.findByIdAndUpdate(req.params.id, req.body.comment, (err, comment) => {
    //        if(err || !comment){
    //            console.log("Error updating comment: ", err);
    //            req.flash("error", "Sorry, this comment does not exist!");
    //        } else {
    //            console.log("Comment updated ", req.params.dateFrom);
    //            req.flash("success", "Comment successfully updated");
    //            return res.status(202).send({
    //                 error: false,
    //                 comment
    //             });
    //        }
    //     });
    // });

    /* 
        Delete like 
        Delete children of this object (Likes)
        Delete References to this like ID from parent objects (Sprint, Post)
    */
    app.delete('/api/likes/:id', middleware.checkLikeOwnership, (req, res) => {
        const { id } = req.params;

        Like.findByIdAndDelete(id)
            .then(like => {
                like
                    ? models[like.likeddObject.model].findByIdAndUpdate(
                          like.likeddObject.id,
                          { $pull: { likes: new mongoose.Types.ObjectId(id) } },
                          { new: true },
                          (err, model) => {
                              return err
                                  ? res.status(500).send({
                                        error: 'Not found',
                                    })
                                  : res.status(202).send({
                                        error: false,
                                        like,
                                        model,
                                    });
                          }
                      )
                    : res.status(500).send({
                          error: `Like ${id} not found`,
                      });
            })
            .catch(err => res.status(500).send({ err }));
    });
};
