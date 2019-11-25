var express = require('express');
var router = express.Router({mergeParams: true});   // mergeParams is necessary to find the Id of a something when posting a new comment 
var Article = require('../models/articles');
var Comment = require('../models/comments');
var User = require("../models/user");
var middleware = require("../middleware");

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
	Article.findById(req.params.id, function(err, article) {
		if (err || !article) {
			req.flash("error", "Sorry, this article does not exist!");
			res.redirect("/articles");
		} else {
			res.render("comments/new", {article: article});
		}
	});
});

// POST ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
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
                    // First save comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
                    
                    // Then save the article to which the comment was added
					article.comments.push(comment);
					article.save();
					req.flash("success", "Comment added successfully");
					res.redirect("/articles/" + article._id);
				}
			});
		}
	});
});

// EDIT ROUTE
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