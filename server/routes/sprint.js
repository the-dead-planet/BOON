const mongoose = require('mongoose');
const middleware = require('../middleware');
const { pathsInMongooseFormat } = require('../common/queries');
const { requestPreprocessor, RequestKind } = require('../common/request');
const ModelRegistry = require('../common/ModelRegistry');
const Sprint = mongoose.model('Sprint');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');

module.exports = (app, modelRegistry, modelId) => {
    const modelDefinition = modelRegistry.findDefinition(modelId);
    const postRequestPreprocessor = requestPreprocessor(modelDefinition.requestMappers[RequestKind.POST] || {});
    const putRequestPreprocessor = requestPreprocessor(modelDefinition.requestMappers[RequestKind.PUT] || {});

    // INDEX - Get all
    app.get(`/api/sprints`, async (req, res) => {
        const query = Sprint.find({});
        return query
            .populate(pathsInMongooseFormat(modelRegistry.populatePaths('Sprint')))
            .exec()
            .catch(err => res.status(500).send({ err }))
            .then(sprints => res.status(200).send(sprints));
    });

    // INDEX - Get one
    app.get(`/api/sprints/:id`, async (req, res) => {
        const query = Sprint.findById(req.params.id);
        return query
            .populate(pathsInMongooseFormat(modelRegistry.populatePaths('Sprint')))
            .exec()
            .then(sprint => res.status(200).send(sprint))
            .catch(err => res.status(500).send({ err }));
    });

    // POST
    app.post('/api/sprints', middleware.isLoggedIn, (req, res) => {
        const sprint = postRequestPreprocessor(req);

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
        const sprint = putRequestPreprocessor(req);

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
