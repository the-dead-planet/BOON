var express 			= require('express'),
	app 				= express(),
	bodyParser 			= require('body-parser'),
	mongoose 			= require('mongoose'),
	flash 				= require('connect-flash'),
	passport 			= require('passport'),
	LocalStrategy 		= require('passport-local'),
	methodOverride 		= require('method-override'),
	Comment 			= require('./models/comments'),
	Article 			= require('./models/articles'),
	User 				= require('./models/user'),
	seedDB				= require('./seeds');

var commentsRoutes 		= require("./routes/comments"),
	articlesRoutes 		= require("./routes/articles"),
	indexRoutes			= require("./routes/index");


// seedDB(); // uncomment only to remove / populate seed dats

// mongoose.connect('mongodb://localhost:27017/boon', { 
mongoose.connect(process.env.DATABASEURL, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

// Passport config
app.use(require('express-session')({
	secret: "Blabla bla bla",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // this one comes from plugin passport-local-mongoose in user.js
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass variables to all routes
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

// Reduce path lenghts
app.use(indexRoutes);
app.use("/articles/", articlesRoutes);
app.use("/articles/:id/comments", commentsRoutes);

// Server check
app.listen(process.env.PORT || 3000, function() {
    console.log("BOON server has started!");
});