var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    methodOverride = require('method-override'),
    UserAuth = require('./models/UserAuth');
User = require('./models/User');

// require('dotenv').config();	// TODO: check .env file

// var seedDB					= require('./seeds');
// seedDB(); // this is not needed anumore, it was populating dummy data

// Connect to Mongo DB
console.log('DATABASEURL env parameter: ', process.env.DATABASEURL);
// mongoose.connect('mongodb://localhost:27017/boon', {
// mongoose.connect('mongodb+srv://globalUser:TestUser1234@somethingcluster-zo5fb.mongodb.net/test?retryWrites=true&w=majority', {
mongoose.connect(process.env.DATABASEURL || 'mongodb://localhost:27017/boon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Some some random thingies
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
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

module.exports = app;
