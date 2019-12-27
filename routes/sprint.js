const mongoose = require('mongoose');
const middleware = require('../middleware');
const Sprint = mongoose.model('Sprint');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

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
            .catch(err => res.status(500).send({err}))
            .then(sprints => res.status(200).send(sprints))
    });

    // POST
    app.post('/api/sprints', middleware.isLoggedIn, (req, res) => {
        let sprint = {
            number: req.body.number,
            name: req.body.name,
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo,
            description: req.body.description,
            author: {
                id: req.user._id,
                username: req.user.username,
            },
            created: req.body.created,
        };

        Sprint.create(sprint)
            .then(sprint => res.status(201).send({
                error: false,
                sprint,
            }))
            .catch(err => res.status(500).send({err}))
    });

    // UPDATE
    app.put('/api/sprints/:id', middleware.checkSprintOwnership, (req, res) => {
        Sprint.findByIdAndUpdate(req.params.id, req.body.sprint)
            .then(sprint => res.status(202).send({
                error: false,
                sprint,
            }))
            .catch(err => res.status(500).send({err}))
        
    });

    // TODO: review sequence of deletion or all related objects
    app.delete('/:id', middleware.checkSprintOwnership, (req, res) => {
        // Delete sprint and all related objects (posts and comments)
        Sprint.findByIdAndDelete(req.params.id)
            .then(sprint => {
                if(sprint) {
                    Post.deleteMany({ _id: req.object.posts })
                        .then(posts => console.log("Posts deleted"))
                        .catch(err => res.status(500).send({err}));

                    Comment.deleteMany({ _id: req.object.comments })
                        .then(comments => console.log("Comments deleted"))
                        .catch(err => res.status(500).send({err}));

                    // Like.deleteMany({ _id: req.object.comments })
                    //     .then(like => console.log("Likes deleted"))
                    //     .catch(err => res.status(500).send({err}));
    
                    return res.status(202).send({
                        error: false,
                        sprint,
                    });
                }
            })
            .catch(err => res.status(500).send({err})) 
    });
};
