let middlewareObj = {};
let Article = require("../models/article");
let Comment = require("../models/comment");

middlewareObj.checkArticleOwnership = function(req, res, next) {
	// IS USER (& AUTHOR) LOGGED IN?
	if(req.isAuthenticated()) {
		Article.findById(req.params.id, function(err, foundArticle) {
			if(err) {
				req.flash("error", "Blog post not found");
				res.redirect("back");
			} else {
				// DOES USER OWN THE ARTICLE?
				if(foundArticle.author.id.equals(req.user._id)) {
					next();
				} else {
					// 'EVENT HANDLER' IF USING POSTMAN
					req.flash("error", "You don't have permission");
					res.redirect("back");
				}	
			}
		});
	} else {
		// WHEN USER IS NOT LOGGED IN
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	// IS USER (& COMMENT'S AUTHOR) LOGGED IN?
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err) {
				res.redirect("back")
			} else {
				// DOES USER OWN COMMENT?
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		// WHEN USER IS NOT LOGGED IN
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Please Login First!");
	res.redirect("/login");
}

module.exports = middlewareObj;
