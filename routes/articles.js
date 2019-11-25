var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var Comment = require('../models/comment');
var User = require("../models/user");
var middleware = require("../middleware");

// INDEX route
router.get("/", function(req, res) {
	// var articles = [];
	// res.render("articles", {articles: articles}); // <- without a db
	
	// Get all articles from db and render if no error
	Article.find({}, function(err, allArticles) {
		if(err) {
			console.log("Error getting all articles from the db: " + err);
		} else {
			res.render("articles/index", {
				articles: allArticles
				// ,
				// currentUser: req.user	// Not needed now because it's defined after deserialize()
			});
		}
	});
});


// REST - new should show the form which will send the data
// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("articles/new");
});


// Convention is to name the routes in get and post the same (REST)
// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
	// get data from the form and add to articles array
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newArticle = {
		
		name: name, 
		price: price,
		image: image,
		description: description,
		author: author};
	
	// articles.push(newArticle); // <- without a DB
	
	// Create a new article and save it to DB
	Article.create(newArticle, function(err, article){
		if(err || !article) {
			req.flash("error", "Something went wrong");
			console.log("Error creating a new article: " + error);
		} else {
			
			// // add username and id to comment
			// // user must be logged in (middleware isLoggedIn) - this is assured
			// article.author.id = req.user._id;
			// article.author.username = req.user.username;
			// // Save comment	
			// article.save(); // not needed - see variables above
			console.log("New article created:");
			console.log(article);
		}
	});
	
	// redirect
	req.flash("success", "Article successfully created");
	res.redirect("/articles");
});


// Show blog post
router.get("/:id", function(req, res){
	// find the article with provided :id and render a page
	// var articleId = req.params.id;
	Article.findById(req.params.id).populate("comments").exec(function(err, article) {
		if (err || !article) {
			console.log(err);
			req.flash("error", "Sorry, this article does not exist");
			res.redirect("/articles");
			console.log("Could not find id error: " + err);
		} else {
			res.render("articles/show", {article: article});
		}
	});
	
});


// EDIT
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkArticleOwnership, function(req, res) {
	res.render("articles/edit", {article: req.article});	
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkArticleOwnership, function(req, res){
    // find and update the correct campground
    Article.findByIdAndUpdate(req.params.id, req.body.article, function(err, updatedArticle){
       if(err || !updatedArticle){
		   req.flash("error", "Sorry, this article does not exist!");
           res.redirect("/articles");
       } else {
           //redirect somewhere(show page)
		   req.flash("success", "Article successfully updated");
           res.redirect("/articles/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkArticleOwnership, function(req, res){
   Article.findByIdAndRemove(req.params.id, function(err, article){
      if(err || !article){
		  req.flash("error", "Sorry, this article does not exist!");
          res.redirect("/articles");
      } else {
		  req.flash("success", "Article successfully deleted");
          res.redirect("/articles");
      }
   });
});


module.exports = router;