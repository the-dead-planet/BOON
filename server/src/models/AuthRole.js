var mongoose = require('mongoose');

// This schema handles user authorization such as: admin, moderator.
// Only selected users (e.g. scrum master, communication specialists) will be able to edit/delete other users' posts
var userSchema = new mongoose.Schema({
    title: String,
    body: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

module.exports = mongoose.model('User', userSchema);
