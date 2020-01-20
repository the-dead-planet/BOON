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
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    methodOverride = require('method-override'),
    UserAuth = require('./models/UserAuth');
User = require('./models/User');

var handleErrors = require('./middleware').handleErrors;

// Some some random thingies
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(flash()); // TODO: check if this will work with React - what are the alternatives

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
    UserAuth schema still needs to have properties named 'username' and 'password'
    'username' property is filled in with e-mail value when creating object and saving to db
*/
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        UserAuth.authenticate()
    )
);

passport.serializeUser(UserAuth.serializeUser());
passport.deserializeUser(UserAuth.deserializeUser());

// Handle API routes
require('./routes/sprint')(app);
require('./routes/post')(app);
require('./routes/comment')(app);
require('./routes')(app);

app.use(handleErrors);

module.exports = app;
