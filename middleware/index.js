var Article = require('../models/article');
var Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	
	req.flash("error", "You need to be logged in to do that"); // flash displays on the next page, therefore needs to go before res.redirect
	res.redirect("/login"); // no need to add 'else' because of return
}

middlewareObj.checkArticleOwnership =	function(req, res, next) {
	if(req.isAuthenticated()) {
		Article.findById(req.params.id, function(err, article) {
			if(err || !article) {
				console.log("err");
				req.flash("error", "Article not found");
				res.redirect("/articles");
			} else {
				
				// if (article.author.id === req.user._id) 	// this wont work, first one is a mongoose object, second is a string
				if(article.author.id.equals(req.user._id)) {
					req.article = article;
					next();
				} else {
					req.flash("error", "You do not have permission to edit this article");
					res.redirect("/articles");
				}
			}
		});
	}
	else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, comment) {
			if(err || !comment) {
				console.log(err);
				req.flash("error", "Comment not found");
				res.redirect("/articles");
			} else {
				
				// if (article.author.id === req.user._id) 	// this wont work, first one is a mongoose object, second is a string
				if(comment.author.id.equals(req.user._id)) {
					req.comment = comment;
					next();
				} else {
					req.flash("error", "You do not have permission to edit this comment");
					res.redirect("/articles");
				}
			}
		});
	}
	else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}

module.exports = middlewareObj;

// could also write functions separately and export an object this way {}