const mongoose = require('mongoose');
const middleware = require('../middleware');
const models = require('../common/models');
const Post = mongoose.model('Post');
const Sprint = mongoose.model('Sprint');

module.exports = app => {
    // INDEX
    app.get(`/api/posts`, async (req, res) => {
        Post.find({})
            .populate('comments')
            .exec()
            .then(posts => res.status(200).send(posts))
            .catch(err => res.status(500).send({ err }));
    });

    // POST
    app.post('/api/posts', middleware.isLoggedIn, (req, res, next) => {
        const { sprintId, title, body, created, model } = req.body;
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
                    postedToObject: {
                        model: model,
                        id: sprintId,
                    },
                    title: title,
                    body: body,
                    author: {
                        id: user._id,
                        username: user.username,
                    },
                    created,
                }).then(post => {
                    sprint.posts.push(post._id);
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

    /* 
        Delete post 
        Delete children of this object (Comments, Likes)
        Delete References to this post ID from parent objects (Sprint)
    */
    app.delete('/api/posts/:id', middleware.checkPostOwnership, (req, res) => {
        const { id } = req.params;

        Post.findByIdAndDelete(id)
            .then(post => {
                post
                    ? models[post.postedToObject.model].findByIdAndUpdate(
                          post.postedToObject.id,
                          { $pull: { posts: new mongoose.Types.ObjectId(id) } },
                          { new: true },
                          (err, model) => {
                              return err
                                  ? res.status(500).send({
                                        error: 'Not found',
                                    })
                                  : res.status(202).send({
                                        error: false,
                                        post,
                                        model,
                                    });
                          }
                      )
                    : res.status(500).send({
                          error: `Post ${id} not found`,
                      });
            })
            .catch(err => res.status(500).send({ err }));
    });
};
