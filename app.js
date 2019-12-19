var express 				= require('express'),
	app 					= express(),
	bodyParser 				= require('body-parser'),
	mongoose 				= require('mongoose'),
	flash 					= require('connect-flash'),
	passport 				= require('passport'),
	LocalStrategy 			= require('passport-local'),
	methodOverride 			= require('method-override'),
	Passport 				= require('./models/post'),
	Sprint 					= require('./models/sprint'),
	Post 					= require('./models/post'),
	Comment 				= require('./models/comment'),
	User 					= require('./models/user'),
	seedDB					= require('./seeds');

var postCommentsRoutes 		= require("./routes/post-comments"),
	sprintCommentsRoutes 	= require("./routes/sprint-comments"),
	sprintsRoutes 			= require("./routes/sprints"),
	postsRoutes 			= require("./routes/posts"),
	indexRoutes				= require("./routes/index");


// seedDB(); // this is not needed anumore, it was populating dummy data
console.log(process.env.DATABASEURL);
// mongoose.connect('mongodb://localhost:27017/boon', { 
// mongoose.connect('mongodb+srv://globalUser:TestUser1234@somethingcluster-zo5fb.mongodb.net/test?retryWrites=true&w=majority', {
mongoose.connect(process.env.DATABASEURL || 'mongodb://localhost:27017/boon', { 
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
	res.locals.error = req.flash("error"); 		// used in header partial
	next();
});

// Reduce path length 
app.use(indexRoutes);
app.use("/sprints/", sprintsRoutes);
app.use("/sprints/:id/comments/", sprintCommentsRoutes);
app.use("/sprints/:id/posts/", postsRoutes);
app.use("/sprints/:id/posts/:post_id/comments/", postCommentsRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log("Boon server has started!");
})