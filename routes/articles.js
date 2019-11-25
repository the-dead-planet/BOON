var express = require('express');
var router = express.Router();
var Article = require('../models/articles');
var Comment = require('../models/comments');
var User = require("../models/user");
var middleware = require("../middleware");

// INDEX route
router.get("/", function(req, res) {
	Article.find({}, function(err, allArticles) {
        if(err || !allArticles) {
			console.log("Error getting articles from the db: " + err);
		} else {
			res.render("articles/index", {
                articles: allArticles
				// , currentUser: req.user	// Not needed now because it's defined after deserialize()
			});
		}
	});
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("articles/new");
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
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
        author: author
    };
        

    Article.create(newArticle, function(err, article){
		if(err || !article) {
			req.flash("error", "Something went wrong");
			console.log("Error creating a new article: " + err);
		} else {
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
    Article.findByIdAndUpdate(req.params.id, req.body.article, function(err, article){
       if(err || !article){
		   req.flash("error", "Sorry, this article does not exist!");
           res.redirect("/articles");
       } else {
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