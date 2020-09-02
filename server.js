let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Article = require("./models/article"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

// REQUIRING ROUTES
let commentRoutes = require("./routes/comments"),
    articleRoutes = require("./routes/articles"),
    indexRoutes = require("./routes/index");

// SETTING UP MONGOOSE WITH MONGODBATLAS
mongoose.set('useUnifiedTopology', true);
//mongoose.connect("mongodb://localhost:27017/JM_Blog_Site", {useNewUrlParser: true}); // Use this line when connecting mongodb locally
mongoose.connect('mongodb+srv://<DataBaseUser>:<DataBaseUserPassword>@cluster0.6...g.mongodb.net/<AnyDataBaseName>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connect to DB');
}).catch(err => {
    console.log('ERROR', err.message);
});

//seedDB(); //This originally seeds the DB

app.use(bodyParser.urlencoded({extended: true}));  
// Setting view engine allows us to skip writing '.ejs'
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session") ({
	secret: "Sushi is my favorite cuisine",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    // next moves to next middleware
	next();
});

// REQUIRING ROUTES
app.use("/", indexRoutes);
app.use("/articles", articleRoutes);
app.use("/articles/:id/comments", commentRoutes);

// INITIAL GET ROUTE
app.get("/", function(req, res) {
    res.render("landing");
});

// Use the following when loading pushing into Heroku
app.listen(process.env.PORT, process.env.IP);

// Use Port 3000 and 0.0.0.0 IP for running locally
/*
app.listen(3000, '0.0.0.0', function() {
    console.log('Juan\'s Blog Site Server is running');
});
*/
