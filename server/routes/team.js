const mongoose = require('mongoose');
const middleware = require('../middleware');
const models = require('../common/models');
const Team = mongoose.model('Team');

module.exports = app => {
    // INDEX - get all
    app.get(`/api/teams`, async (req, res) => {
        Team.find({})
            .populate({
                path: 'members',
            })
            .exec()
            .then(teams => res.status(200).send(teams))
            .catch(err => res.status(500).send({ err }));
    });

    // INDEX - Get one
    app.get(`/api/teams/:id`, async (req, res) => {
        Team.findById(req.params.id)
            .populate({
                path: 'members',
            })
            .exec()
            .then(project => res.status(200).send(project))
            .catch(err => res.status(500).send({ err }));
    });

    //     /*
    //         Create new project
    //     */
    //     app.post('/api/projects', middleware.isLoggedIn, (req, res, next) => {
    //         const { title, body } = req.body;
    //         const user = req.user;

    //         return Project.create({
    //             title: title,
    //             body: body,
    //             author: user._id,
    //         })
    //             .then(project => {
    //                 return res.status(201).send({
    //                     error: false,
    //                     project,
    //                 });
    //             })
    //             .catch(next);
    //     });

    //     /*
    //         UPDATE
    //         Update project with values from user form
    //         Add/replace 'edited' date with today
    //     */
    //     app.put('/api/projects/:id', middleware.checkProjectOwnership, (req, res) => {
    //         let project = {
    //             title: req.body.title,
    //             body: req.body.body,
    //             edited: Date.now(),
    //         };

    //         Project.findByIdAndUpdate(req.params.id, project)
    //             .then(project => {
    //                 project.save().then(() =>
    //                     res.status(202).send({
    //                         error: false,
    //                         project,
    //                     })
    //                 );
    //             })
    //             .catch(err => res.status(500).send({ err }));
    //     });

    //     /*
    //         Allow project deletion if no posts are linked to it (its posts array is empty)
    //     */
    //     app.delete('/api/projects/:id', middleware.checkProjectOwnership, (req, res) => {
    //         const { id } = req.params;

    //         Project.findById(id)
    //             .then(project =>
    //                 !project.posts || project.posts.length === 0
    //                     ? Project.findByIdAndDelete(id).then(async project => {
    //                           if (project) {
    //                               res.status(202).send();
    //                           } else {
    //                               res.status(500).send({
    //                                   error: `Project ${id} not found`,
    //                               });
    //                           }
    //                       })
    //                     : res.status(500).send({
    //                           error: `Project with posts cannot be deleted`,
    //                       })
    //             )
    //             .catch(err => res.status(500).send({ err }));
    //     });
};
