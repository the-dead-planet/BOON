// This file exposes the whole app as a library.
//
// It *does not* connect the app to the real world. All external clients should
// be injectable / configurable from the outside to make testing possible.
// For example, the library does not connect to the database - it depends on
// the caller initializing the connection. This allows using a different connection
// in unit tests, and a different one in a production environment.

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    methodOverride = require('method-override'),
    User = require('./models/User');
seedDB = require('./seeds');

const ModelRoutesDefinition = require('./common/ModelRoutesDefinition');
const ModelRegistry = require('./common/ModelRegistry');

var handleErrors = require('./middleware').handleErrors;

// // Add data to data base - comment if done once
// seedDB();

// Some some random thingies
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Production setup
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('reactApp/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'reactApp', 'build', 'index.html'));
    });
}

// Passport config - authentication
app.use(
    require('express-session')({
        secret: 'Blabla bla bla',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
/*
    Local Strategy uses value of input field with name='email' not 'username'
    User schema still needs to have properties named 'username' and 'password'
    'username' property is filled in with e-mail value when creating object and saving to db
*/
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        User.authenticate()
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Define models.
const modelRegistry = new ModelRegistry({
    Comment: new ModelRoutesDefinition({
        author: 'User',
        likes: 'Like',
    }),

    Like: new ModelRoutesDefinition({
        author: 'User',
    }),

    Post: new ModelRoutesDefinition({
        author: 'User',
        comments: 'Comment',
        likes: 'Like',
    }),

    Project: new ModelRoutesDefinition({
        author: 'User',
        posts: 'Post',
        likes: 'Like',
    }),

    Sprint: new ModelRoutesDefinition({
        author: 'User',
        comments: 'Comment',
        likes: 'Like',
        posts: 'Post',
    }),

    Team: new ModelRoutesDefinition({
        members: 'User',
    }),

    User: new ModelRoutesDefinition({}),
});

// Handle API routes
// TODO: use `modelRegistry` in all routes.
require('./routes/sprint')(app, modelRegistry);
require('./routes/project')(app);
require('./routes/post')(app);
require('./routes/comment')(app);
require('./routes/like')(app);
require('./routes/team')(app);
require('./routes/auth')(app);
require('./routes/user')(app);

app.use(handleErrors);

module.exports = app;
