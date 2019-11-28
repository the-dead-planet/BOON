var express = require('express');
var router = express.Router();
var Sprint = require('../models/sprint');
var Post = require('../models/post');
var Comment = require('../models/comment');
var User = require("../models/user");
var middleware = require("../middleware");

// INDEX route
router.get("/", function(req, res) {
	Post.find({}, function(err, allPosts) {
		if(err) {
			console.log("Error getting all posts from the db: " + err);
		} else {
			res.render("posts/index", {
				posts: allPosts
			});
		}
	});
});


// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("posts/new");
});


// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
    var description = req.body.description;
    var sprint = req.body.sprint;
	var author = {
		id: req.user._id,
		username: req.user.username
    };
    var created = req.body.created;
	var newPost = {
		name: name, 
        description: description,
        sprint: sprint,
        author: author,
        created
    };
	
	Post.create(newPost, function(err, post){
		if(err || !post) {
			req.flash("error", "Something went wrong");
			console.log("Error creating new post: " + error);
		} else {
			console.log("New post created:");
			console.log(post);
		}
	});
	
	// redirect
	req.flash("success", "Post successfully created");
	res.redirect("/posts");
});


// Show blog post
router.get("/:id", function(req, res){
	Post.findById(req.params.id).populate("comments").exec(function(err, post) {
		if (err || !post) {
			console.log(err);
			req.flash("error", "Sorry, this post does not exist");
			res.redirect("/posts");
			console.log("Could not find id error: " + err);
		} else {
			res.render("posts/show", {post: post});
		}
	});
	
});


// EDIT
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkPostOwnership, function(req, res) {
	res.render("posts/edit", {post: req.post});	
});

// UPDATE ROUTE
router.put("/:id", middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
       if(err || !updatedPost){
		   req.flash("error", "Sorry, this post does not exist!");
           res.redirect("/posts");
       } else {
		   req.flash("success", "Post successfully updated");
           res.redirect("/posts/" + req.params.id);
       }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkPostOwnership, function(req, res){
   Post.findByIdAndRemove(req.params.id, function(err, post){
      if(err || !post){
		  req.flash("error", "Sorry, this post does not exist!");
          res.redirect("/posts");
      } else {
		  req.flash("success", "Post successfully deleted");
          res.redirect("/posts");
      }
   });
});


module.exports = router;