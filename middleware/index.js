let middlewareObj = {};
let Article = require("../models/article");
let Comment = require("../models/comment");

middlewareObj.checkArticleOwnership = function(req, res, next){
	//function checkBackgroundOwnership(req, res, next){
	// is user logged in?
	if(req.isAuthenticated()){
		Article.findById(req.params.id, function(err, foundArticle){
			if(err){
				req.flash("error", "Blog post not found");
				res.redirect("back");
			} else {
				// does user own the campground?
				//console.log(foundCampground.author.id);
				//console.log(req.user._id)
				if(foundArticle.author.id.equals(req.user._id)){
					//res.render("campgrounds/edit", {campground: foundCampground});
					next();
				} else {
					//res.send("You don't have permission to do that");
					req.flash("error", "You don't have permission");
					res.redirect("back");
				}
				
			}
		});
	} else {
		//console.log("You need to be logged in to do that");
		//res.send("You need to be logged in to do that");
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
	// does user own the campground?
}

middlewareObj.checkCommentOwnership = function(req, res, next){
//function checkCommentOwnership(req, res, next){
// is user logged in?
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back")
			} else {
				// does user own the comment?
				if(foundComment.author.id.equals(req.user._id)){
					//res.render("campgrounds/edit", {campground: foundCampground});
					next();
				} else {
					//res.send("You don't have permission to do that");
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			
			}
			});
	} else {
		//console.log("You need to be logged in to do that");
		//res.send("You need to be logged in to do that");
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
	// does user own the campground?
}

middlewareObj.isLoggedIn = function(req, res, next){
//function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login First!");
	res.redirect("/login");
}

module.exports = middlewareObj;