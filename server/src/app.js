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
    LocalStrategy = require('passport-local').Strategy;

// Import models.
// Initializes mongoose as a side effect.
const Sprint = require('./models/Sprint');
const Post = require('./models/Post');
const Project = require('./models/Project');
const User = require('./models/User');
const Team = require('./models/Team');
const Comment = require('./models/Comment');
const Like = require('./models/Like');

// Utilities.
const ModelRoutesDefinition = require('./common/ModelRoutesDefinition');
const ModelRegistry = require('./common/ModelRegistry');
const { RequestMethod } = require('./common/request');
const Link = require('./common/Link');
const Route = require('./common/Route');
const Routes = require('./common/Routes');
const { SingleModelField, ManyModelField } = require('./common/ModelField');

var handleErrors = require('./middleware').handleErrors;

// Some some random thingies
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
// TODO: move to separate modules, extract `author` and `edited` handlers to decorators
const modelRegistry = new ModelRegistry({
    Comment: new ModelRoutesDefinition(
        {
            author: new SingleModelField('User'),
            likes: new ManyModelField('Like'),
        },
        {
            [RequestMethod.POST]: {
                author: (req) => req.user._id,
                commentedObject: (req) => new Link(req.body.model, req.body.id, 'comments'),
            },
            [RequestMethod.PUT]: { edited: (req) => Date.now() },
        }
    ),

    Like: new ModelRoutesDefinition(
        {
            author: new SingleModelField('User'),
        },
        {
            [RequestMethod.POST]: { author: (req) => req.user._id },
        }
    ),

    Post: new ModelRoutesDefinition(
        {
            author: new SingleModelField('User'),
            comments: new ManyModelField('Comment'),
            likes: new ManyModelField('Like'),
        },
        {
            [RequestMethod.POST]: { author: (req) => req.user._id },
            [RequestMethod.PUT]: { edited: (req) => Date.now() },
        }
    ),

    Project: new ModelRoutesDefinition(
        {
            author: new SingleModelField('User'),
            posts: new ManyModelField('Post'),
            likes: new ManyModelField('Like'),
        },
        {
            [RequestMethod.POST]: { author: (req) => req.user._id },
            [RequestMethod.PUT]: { edited: (req) => Date.now() },
        }
    ),

    Sprint: new ModelRoutesDefinition(
        {
            author: new SingleModelField('User'),
            comments: new ManyModelField('Comment'),
            likes: new ManyModelField('Like'),
            posts: new ManyModelField('Post'),
        },
        {
            [RequestMethod.POST]: { author: (req) => req.user._id },
            [RequestMethod.PUT]: { edited: (req) => Date.now() },
        }
    ),

    Team: new ModelRoutesDefinition({
        members: new ManyModelField('User'),
    }),

    User: new ModelRoutesDefinition({}),
});

// Handle API routes
const routes = new Routes(
    [
        require('./routes/auth'),
        require('./routes/comment'),
        require('./routes/like'),
        require('./routes/post'),
        require('./routes/project'),
        require('./routes/sprint'),
        require('./routes/team'),
        require('./routes/user'),
    ]
        .map((routesModule) => routesModule(modelRegistry))
        .flat()
);

routes.connect(app);

app.use(handleErrors);

// Production setup
// Serve static files from the React app
// Catch any other routes than the ones above - must be after all api routes
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./build'));

    const path = require('path');
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

module.exports = app;
