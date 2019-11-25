var express = require('express');
// mergeParams is necessary to find the Id of a article when posting a new comment 
var router = express.Router({mergeParams: true});
var Article = require('../models/article');
var Comment = require('../models/comment');
var User = require("../models/user");
var middleware = require("../middleware");


// Nested routes for COMMENTS
// NEW 		articles/:id/comments/new		GET
// CREATE 	articles/:id/comments			POST
// EDIT		articles/:id/comments/edit	POST / use PUT

router.get("/new", middleware.isLoggedIn, function(req, res){
	// find the article with provided :id and render a page
	// var articleId = req.params.id;
	Article.findById(req.params.id, function(err, article) {
		if (err || !article) {
			req.flash("error", "Sorry, this article does not exist!");
			res.redirect("/articles");
		} else {
			res.render("comments/new", {article: article});
		}
	});
	
});


// Post comment and get back to the article page
router.post("/", middleware.isLoggedIn, function(req, res){
	// find the article with provided :id and render a page
	// var articleId = req.params.id;
	Article.findById(req.params.id, function(err, article) {
		if (err || !article) {
			req.flash("error", "Sorry, this article does not exist!");
			res.redirect("/articles");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					// add username and id to comment
					// user must be logged in (middleware isLoggedIn) - this is assured
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// Save comment	
					comment.save();
								
					article.comments.push(comment);
					article.save();
					req.flash("success", "Comment added successfully");
					res.redirect("/articles/" + article._id);
				}
			});
			
		}
	});
	
});

router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req,res) {
	res.render("comments/edit", {
		article_id: req.params.id,
			comment: req.comment
		});
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
		if (err) {
			req.flash("error", "Something went wrong");
			res.redirect("back");
		} else {
			req.flash("success", "Comment successfully updated");
			res.redirect("/articles/" + req.params.id);
		}
	});
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err, comment) {
		if (err || !comment) {
			req.flash("error", "Sorry, this comment does not exist");
			res.redirect("back");
		} else {
			req.flash("success", "Comment successfully deleted");
			res.redirect("/articles/" + req.params.id);
		}
	});
});


module.exports = router;