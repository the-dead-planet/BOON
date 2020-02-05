const mongoose = require('mongoose');
const middleware = require('../middleware');
const Sprint = mongoose.model('Sprint');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');

module.exports = app => {
    app.get('/', async (req, res) => {
        res.send("BOON API's: /api/sprints  /api/posts  /api/comments  /api/users");
    });

    // INDEX
    app.get(`/api/sprints`, async (req, res) => {
        Sprint.find({})
            .populate({
                path: 'posts comments',
                populate: {
                    path: 'comments',
                },
            })
            .exec()
            .catch(err => res.status(500).send({ err }))
            .then(sprints => res.status(200).send(sprints));
    });

    // POST
    app.post('/api/sprints', middleware.isLoggedIn, (req, res) => {
        let sprint = {
            number: req.body.number,
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo,
            title: req.body.title,
            body: req.body.body,
            author: {
                id: req.user._id,
                username: req.user.username,
            },
            created: req.body.created,
        };

        Sprint.create(sprint)
            .then(sprint =>
                res.status(201).send({
                    error: false,
                    sprint,
                })
            )
            .catch(err => res.status(500).send({ err }));
    });

    // UPDATE
    app.put('/api/sprints/:id', middleware.checkSprintOwnership, (req, res) => {
        Sprint.findByIdAndUpdate(req.params.id, req.body.sprint)
            .then(sprint =>
                res.status(202).send({
                    error: false,
                    sprint,
                })
            )
            .catch(err => res.status(500).send({ err }));
    });

    /* 
        Delete sprint 
        Delete children of this object (Comments, Likes, Posts)
        Delete References to this post ID from parent objects (N/A for now)
    */
    app.delete('/api/sprints/:id', middleware.checkSprintOwnership, (req, res) => {
        const { id } = req.params;

        Sprint.findByIdAndDelete(id)
            .then(async sprint => {
                if (sprint) {
                    const posts = await Post.deleteMany({ _id: sprint.posts }).catch(err =>
                        res.status(500).send({ err })
                    );

                    const comments = await Comment.deleteMany({ _id: sprint.comments }).catch(err =>
                        res.status(500).send({ err })
                    );

                    // const likes = await Like.deleteMany({ _id: sprint.likes })
                    //     .catch(err => res.status(500).send({ err }));

                    res.status(202).send({
                        error: false,
                        sprint,
                        posts,
                        comments,
                        // likes
                    });
                } else {
                    res.status(500).send({
                        error: `Sprint ${id} not found`,
                    });
                }
            })
            .catch(err => res.status(500).send({ err }));
    });
};
