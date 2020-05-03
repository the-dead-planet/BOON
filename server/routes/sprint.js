const mongoose = require('mongoose');
const middleware = require('../middleware');
const { populateFromPaths } = require('../common/queries');
const ModelRoutesDefinition = require('../common/ModelRoutesDefinition');
const Sprint = mongoose.model('Sprint');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');

// TODO: use the defnition in all routes.
const routesDefinition = new ModelRoutesDefinition('Sprint', {
    posts: 'Post',
    comments: 'Comment',
    likes: 'Like',
    author: 'User',
});

module.exports = app => {
    // INDEX - Get all
    app.get(`/api/sprints`, async (req, res) => {
        const query = Sprint.find({});
        const populatedQuery = populateFromPaths(query, routesDefinition.populatePaths());
        return populatedQuery
            .exec()
            .catch(err => res.status(500).send({ err }))
            .then(sprints => res.status(200).send(sprints));
    });

    // INDEX - Get one
    app.get(`/api/sprints/:id`, async (req, res) => {
        const query = Sprint.findById(req.params.id);
        const populatedQuery = populateFromPaths(query, routesDefinition.populatePaths());
        return populatedQuery
            .exec()
            .then(sprint => res.status(200).send(sprint))
            .catch(err => res.status(500).send({ err }));
    });

    // POST
    app.post('/api/sprints', middleware.isLoggedIn, (req, res) => {
        // TODO: unify body -> sprint logic with POST
        let sprint = {
            number: req.body.number,
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo,
            title: req.body.title,
            body: req.body.body,
            author: req.user._id,
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

    /* 
        UPDATE
        Update sprint with values from user form
        Add/replace 'edited' date with today
    */
    app.put('/api/sprints/:id', middleware.checkSprintOwnership, (req, res) => {
        // TODO: unify body -> sprint logic with POST
        let sprint = {
            number: req.body.number,
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo,
            title: req.body.title,
            body: req.body.body,
            edited: Date.now(),
        };

        Sprint.findByIdAndUpdate(req.params.id, sprint)
            .then(sprint => {
                sprint.save().then(() =>
                    res.status(202).send({
                        error: false,
                        sprint,
                    })
                );
            })
            .catch(err => res.status(500).send({ err }));
    });

    /* 
        Delete sprint 
        Delete children of this object (Comments, Likes, Posts)
        Delete References to this post ID from parent objects (N/A for now)
    */
    app.delete('/api/sprints/:id', middleware.checkSprintOwnership, (req, res) => {
        // TODO: get related objects from `ModelRoutesDefinition`
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

                    const likes = await Like.deleteMany({ _id: sprint.likes }).catch(err =>
                        res.status(500).send({ err })
                    );

                    res.status(202).send({
                        error: false,
                        sprint,
                        posts,
                        comments,
                        likes,
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
