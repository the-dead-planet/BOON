const mongoose = require('mongoose');
const middleware = require('../middleware');
const Comment = mongoose.model('Comment');

module.exports = app => {
    // INDEX
    app.get(`/api/comments`, async (req, res) => {
        Comment.find({})
            .then(comments => res.status(200).send(comments))
            .catch(err => res.status(500).send({ err }));
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
};
