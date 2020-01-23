const mongoose = require('mongoose');
const middleware = require('../middleware');
const errors = require('../common/errors');
const Comment = mongoose.model('Comment');
const Sprint = mongoose.model('Sprint');

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
        const { sprintId, body, created } = req.body;
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

    // TODO: post, update and destroy comment routes
    // // POST
    // app.post("/api/comments", middleware.isLoggedIn, (req, res) => {
    //     let comment = {
    //         number: req.body.number,
    //         name: req.body.name,
    //         dateFrom: req.body.dateFrom,
    //         dateTo: req.body.dateTo,
    //         description: req.body.description,
    //         author: {
    //             id: req.user._id,
    //             username: req.user.username
    //         },
    //         created: req.body.created
    //     };

    //     // Create a new comment and save it to DB
    //     Comment.create(comment, (err, comment) => {
    //         if(err || !comment) {
    //             console.log("Error creating new comment: ", err);
    //             req.flash("error", "Something went wrong");
    //         } else {
    //             console.log("New comment created:", err);
    //             req.flash("success", "Comment successfully created");
    //             return res.status(201).send({
    //                 error: false,
    //                 comment
    //             });
    //         }
    //     });
    // });

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

    // // DESTROY
    // app.delete("/:id", middleware.checkSprintOwnership, (req, res) => {
    //     // Delete comment and all related objects (comments and comments)
    //     Comment.findByIdAndDelete(req.params.id, function(err, comment){
    //         if(err || !comment){
    //             console.log("Deleting unsuccessful")
    //             req.flash("error", "Sorry, this comment does not exist!");
    //         } else {
    //             req.flash("success", "Comment deleted");

    //             // TODO: find a more fancy solution to delete all related objects and handle async behavior
    //             // delete associated comments
    //             Comment.deleteMany({_id: req.object.comments}, (err, comment) => {
    //                 if (err || !comment) {
    //                     req.flash("error", "Sorry, this comment does not exist");
    //                 } else {
    //                     req.flash("success", "Related comments deleted");
    //                 }
    //             });

    //             // delete associated comments
    //             Comment.deleteMany({_id: req.object.comments}, (err, comment) => {
    //                 if (err || !comment) {
    //                     req.flash("error", "Sorry, this comment does not exist");
    //                 } else {
    //                     req.flash("success", "Related comments deleted");
    //                 }
    //             });

    //             return res.status(202).send({
    //                 error: false,
    //                 comment
    //             })
    //         }
    //     });
    // });

    app.delete('/api/comments/:id', middleware.checkCommentOwnership, (req, res) => {
        const { commentId } = req.body;

        Comment.findByIdAndDelete(commentId)
            .then(comment => {
                comment
                    ? // TODO: if comments have likes - delete them

                      res.status(202).send({
                          error: false,
                          comment,
                      })
                    : res.status(500).send({
                          error: 'Not found',
                      });
            })
            .catch(err => res.status(500).send({ err }));
    });
};
