let express = require('express');
let router = express.Router({mergeParams: true});
let Article = require("../models/article");
let Comment = require("../models/comment");
let middleware = require("../middleware");

// COMMENTS ROUTES
router.get("/new", middleware.isLoggedIn, function(req, res) {
	//res.send("This will be the comment form");
	//res.render("comments/new");
	Article.findById(req.params.id, function(err, article) {
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {article: article});
		}
	});
});

router.post("/", middleware.isLoggedIn, function(req, res) {
	//lookup campground using ID
	Article.findById(req.params.id, function(err, article) {
		if(err) {
			console.log(err);
			res.redirect("/articles");
		} else {
			// Add username and id to comment...
			//comment.author.id = req.user._id;
			//comment.author.username = req.user.username; 
			//console.log(req.body.comment);
			// Comment.create({})
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					req.flash("error", "Campground not found");
					console.log(err);
				} else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					article.comments.push(comment);
					article.save();
					req.flash("sucess", "Successfully added comment");
					res.redirect('/articles/' + article._id);
				}
			});
		}
	});
	//create new comment
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {article_id: req.params.id, comment: foundComment});
		}
	});
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	//res.send("You hit the update route for comment");
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/articles/" + req.params.id);
		}
	});
});

// COMMENT'S DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	//findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("/articles/" + req.params.id);
		}
	});
});

/*
// MIDDLEWARE
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}*/

module.exports = router;