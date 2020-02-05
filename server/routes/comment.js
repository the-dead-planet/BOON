const mongoose = require('mongoose');
const middleware = require('../middleware');
const errors = require('../common/errors');
const models = require('../common/models');
const Comment = mongoose.model('Comment');
const Sprint = mongoose.model('Sprint');
const Post = mongoose.model('Post');

module.exports = app => {
    // INDEX
    app.get('/api/comments', async (req, res) => {
        Comment.find({})
            .then(comments => res.status(200).send(comments))
            .catch(err => res.status(500).send({ err }));
    });

    app.get('/api/comments/:id', async (req, res) => {
        Comment.find({ _id: req.params.id })
            .then(comments => res.status(200).send(comments))
            .catch(err => res.status(500).send({ err }));
    });

    // POST
    app.post('/api/comments', middleware.isLoggedIn, (req, res, next) => {
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
                Comment.create({
                    commentedObject: {
                        model: model,
                        id: sprintId,
                    },
                    body: body,
                    author: {
                        id: user._id,
                        username: user.username,
                    },
                    created,
                }).then(comment => {
                    sprint.comments.push(comment._id);
                    return sprint.save().then(() => comment);
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
        Delete comment 
        Delete children of this object (Likes)
        Delete References to this comment ID from parent objects (Sprint, Post)
    */
    app.delete('/api/comments/:id', middleware.checkCommentOwnership, (req, res) => {
        const { id } = req.params;

        Comment.findByIdAndDelete(id)
            .then(comment => {
                comment
                    ? models[comment.commentedObject.model].findByIdAndUpdate(
                          comment.commentedObject.id,
                          { $pull: { comments: new mongoose.Types.ObjectId(id) } },
                          { new: true },
                          (err, model) => {
                              return err
                                  ? res.status(404).send({
                                        error: 'Not found',
                                    })
                                  : res.status(202).send({
                                        error: false,
                                        comment,
                                        model,
                                    });
                          }
                      )
                    : res.status(404).send({
                          error: `Comment ${id} not found`,
                      });
            })
            .catch(err => res.status(500).send({ err }));
    });
};
