var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//
router.get('/', function(req, res) {
    res.render('landing');
});

// Auth Routes
router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    User.register(
        new User({
            username: req.body.username,
            email: req.body.email,
            team: req.body.team,
        }),
        req.body.password,
        function(err, user) {
            if (err) {
                console.log('Cannot register: ' + err);
                req.flash('error', err.message);
                return res.redirect('/register');
            }

            passport.authenticate('local')(req, res, function() {
                req.flash('success', 'Welcome to BOON!, ' + user.username);
                res.redirect('/sprints');
            });
        }
    );
});

// Log in
router.get('/login', function(req, res) {
    res.render('login', { message: req.flash('error') });
});

router.post(
    '/login',
    passport.authenticate('local', {
        // success commented out as successful route is moved to function(req, res) in order to use current username from req
        // successRedirect: "/sprints",
        // successFlash: "Welcome back!"
        failureRedirect: '/login',
        // failureFlash: "Wrong username or password"
        failureFlash: true,
    }),
    function(req, res) {
        req.flash('success', 'Welcome back, ' + req.user.username);
        res.redirect('/sprints');
    }
);

// Log Out
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect('/sprints');
});

module.exports = router;
