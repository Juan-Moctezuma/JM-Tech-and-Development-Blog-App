let express = require('express');
let router = express.Router();
let passport = require("passport");
let User = require("../models/user");
let Article = require("../models/article");
const user = require('../models/user');

/*
app.get("/", function(req, res) {
    // Initial route
    //res.send("this is intro page");
    res.render("landing");
});*/

// AUTH ROUTES
// Show register form
router.get("/register", function(req, res) {
	res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res) {
	//res.send("Signing you up");
	var newUser = new User({
		username: req.body.username
		//email: req.body.email
	});

	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render("register", {"error":err.message});
		}
		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Welcome to JMTD " + user.username);
			res.redirect("/articles");
		});
	});
});

// Login Form
router.get("/login", function(req, res) {
	res.render("login");
});

// Handling Form logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/articles",
		failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Welcome back!"
}), function(req, res){
	//res.send("Login Logic Happens Here");
});

// Logout Route
router.get("/logout", function(req, res) {
	//res.send("Ok I will log you out, not yet though...")
	req.logout();
	req.flash("success", "You just logged out");
	res.redirect("/articles");
});

module.exports = router;