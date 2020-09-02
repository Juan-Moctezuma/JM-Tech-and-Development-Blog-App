let express = require('express');
let router = express.Router();
let Article = require("../models/article");
let Comment = require("../models/comment");
let middleware = require("../middleware");

// INDEX - Show all Blogs
router.get("/", function(req, res) {
    // This will return [object],[object],[object]
    // NOTE: articles.ejs was deleted
    // NOTE: This is hard coded
    //res.render("articles", {blogs: blogs});
    // Get all articles from DB
    Article.find({}, function(err, allArticles) {
        if(err) {
            console.log(err);
        } else {
            res.render("articles/index", {blogs: allArticles}); // {blogs: allArticles, currentUser: req.user});
        }
    });
});

// CREATE - Add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	//res.send("You hit the Post Route")
	//Ignore previous: get data from form and add to campgrounds array
	let title = req.body.title;
    let image = req.body.image;
    let cont = req.body.content;
    let author = {
		id: req.user._id,
		username: req.user.username
	}
    let newArticle = {title: title, image: image, content: cont, author: author};
    Article.create(newArticle, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect (back to articles) is by default a GET request
            console.log(newlyCreated);
	        res.redirect("/articles");
        }
    });
	// blogs.push(newArticle);
	// get data from form and add to compounds array
});

//NEW - Show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("articles/new");
});

// This route has to go after 'articles/new' otherwise will get treated as id
// SHOW - shows more info about one article
router.get("/:id", function(req, res) {
    // Find the article with provided ID
    // Render show template with that campground
    //res.send("THIS WILL BE THE SHOW PAGE");
    Article.findById(req.params.id).populate("comments").exec(function(err, foundArticle) {
        if(err) {
            console.log(err);
        } else {
            // Render show template with that article
            res.render("articles/show", {article: foundArticle});
        }
    });
    //req.params.id
    //res.render("show");
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkArticleOwnership, function(req, res){
	// is user logged in?
	Article.findById(req.params.id, function(err, foundArticle){
		res.render("articles/edit", {article: foundArticle});
	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkArticleOwnership, function(req, res){
	// Find and update the correct background
	Article.findByIdAndUpdate(req.params.id, req.body.article, function(err, updatedArticle){
		if (err){
			res.redirect("/articles");
		} else {
			res.redirect("/articles/" + req.params.id);
		}
	});
	// Redirect somewhere(show page)
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkArticleOwnership, function(req, res){
	//res.send("YOU are trying to delete something");
	Article.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/articles");
		} else {
			res.redirect("/articles");
		}
	});
});
/*
router.delete("/:id", middleware.checkArticleOwnership, function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            res.redirect("/articles");
        } else {
            // deletes all comments associated with the campground
            Comment.remove({"_id": {$in: article.comments}}, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect("/articles");
                }
            });
        }
    });
});
*/
module.exports = router;