var express = require('express');
// mergeParams is necessary to find the Id of a post when posting a new comment 
var router = express.Router({mergeParams: true});
var Post = require('../models/post');
var Comment = require('../models/comment');
var User = require("../models/user");
var middleware = require("../middleware");



router.get("/new", middleware.isLoggedIn, function(req, res){
	Post.findById(req.params.id, function(err, post) {
		if (err || !post) {
			req.flash("error", "Sorry, this post does not exist!");
			res.redirect("/posts");
		} else {
			res.render("comments/new", {post: post});
		}
	});
	
});


// Post comment and get back to the post page
router.post("/", middleware.isLoggedIn, function(req, res){
	Post.findById(req.params.id, function(err, post) {
		if (err || !post) {
			req.flash("error", "Sorry, this post does not exist!");
			res.redirect("/posts");
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
								
					post.comments.push(comment);
					post.save();
					req.flash("success", "Comment added successfully");
					res.redirect("/posts/" + post._id);
				}
			});
			
		}
	});
	
});

router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req,res) {
	res.render("comments/edit", {
		post_id: req.params.id,
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
			res.redirect("/posts/" + req.params.id);
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
			res.redirect("/posts/" + req.params.id);
		}
	});
});


module.exports = router;