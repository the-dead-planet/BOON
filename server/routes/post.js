const mongoose = require('mongoose');
const middleware = require('../middleware');
const Post = mongoose.model('Post');

module.exports = app => {
    // INDEX
    app.get(`/api/posts`, async (req, res) => {
        Post.find({})
            .populate('comments')
            .exec()
            .then(posts => res.status(200).send(posts))
            .catch(err => res.status(500).send({ err }));
    });

    // TODO: post, update and delete post linked to a sprint
    // // POST
    // app.post("/api/posts", middleware.isLoggedIn, (req, res) => {
    //     let post = {
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

    //     // Create a new post and save it to DB
    //     Post.create(post, (err, post) => {
    //         if(err || !post) {
    //             console.log("Error creating new post: ", err);
    //             req.flash("error", "Something went wrong");
    //         } else {
    //             console.log("New post created:", err);
    //             req.flash("success", "Post successfully created");
    //             return res.status(201).send({
    //                 error: false,
    //                 post
    //             });
    //         }
    //     });
    // });

    // // UPDATE
    // app.put("/api/posts/:id", middleware.checkSprintOwnership, (req, res) => {
    //     Post.findByIdAndUpdate(req.params.id, req.body.post, (err, post) => {
    //        if(err || !post){
    //            console.log("Error updating post: ", err);
    //            req.flash("error", "Sorry, this post does not exist!");
    //        } else {
    //            console.log("Post updated ", req.params.dateFrom);
    //            req.flash("success", "Post successfully updated");
    //            return res.status(202).send({
    //                 error: false,
    //                 post
    //             });
    //        }
    //     });
    // });

    // // DESTROY
    // app.delete("/:id", middleware.checkSprintOwnership, (req, res) => {
    //     // Delete post and all related objects (posts and comments)
    //     Post.findByIdAndDelete(req.params.id, function(err, post){
    //         if(err || !post){
    //             console.log("Deleting unsuccessful")
    //             req.flash("error", "Sorry, this post does not exist!");
    //         } else {
    //             req.flash("success", "Post deleted");

    //             // TODO: find a more fancy solution to delete all related objects and handle async behavior
    //             // delete associated posts
    //             Post.deleteMany({_id: req.object.posts}, (err, post) => {
    //                 if (err || !post) {
    //                     req.flash("error", "Sorry, this post does not exist");
    //                 } else {
    //                     req.flash("success", "Related posts deleted");
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
    //                 post
    //             })
    //         }
    //     });
    // });
};
