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

// Requiring Routes
let commentRoutes = require("./routes/comments"),
    articleRoutes = require("./routes/articles"),
    indexRoutes = require("./routes/index");

//seedDB(); //This seeds the DB
mongoose.set('useUnifiedTopology', true);
//mongoose.connect("mongodb://localhost:27017/JM_Blog_Site", {useNewUrlParser: true});
mongoose.connect('mongodb+srv://JuanMoctezuma:leo050805@cluster0.6zyog.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connect to DB');
}).catch(err => {
    console.log('ERROR', err.message);
});
//mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});

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

// SCHEMA SETUP
/*
let articleSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String
});

let Article = mongoose.model("Article", articleSchema);
*/

/*
Article.create(
    {
        title: "The final Python 2 release marks the end of an era",
        image: "https://149351115.v2.pressablecdn.com/wp-content/uploads/2020/04/iStock-1163246490-1536x1024.jpg",
        body: "This article is about development"
    }, function(err, article) {
        if(err) {
            console.log(err);
        } else {
            console.log("NEWLY CREATED BLOG: ");
            console.log(article);
        }
    }
);*/

/*
let blogs = [
    {title: "The final Python 2 release marks the end of an era", image: "https://149351115.v2.pressablecdn.com/wp-content/uploads/2020/04/iStock-1163246490-1536x1024.jpg"},
    {title: "NASA, SpaceX Targeting October for Next Astronaut Launch", image: "https://blogs.nasa.gov/commercialcrew/wp-content/uploads/sites/230/2020/08/Crew-1_CEITpt2-20200612-DSC05519_2_-1024x683.jpg"},
    {title: "IMHO: The Mythical Fullstack Engineer", image: "https://149351115.v2.pressablecdn.com/wp-content/uploads/2019/10/steve-johnson-y-mB90P-6DY-unsplash-945x630.jpg"},
    {title: "Raspberry Pi keyboards for Japan are here!",  image: "https://www.raspberrypi.org/app/uploads/2020/08/JAPAN-KEYBOARD-RED_White-1536x1024.jpg"},
    {title: "React v17.0 Release Candidate: No New Features", image: "https://i.morioh.com/2934a8d84c.png"},
    {title: "Designing a replacement for an obsolete Electro Cam control system", image: "https://www.featurepics.com/StockImage/20090405/chip-on-green-circuit-board-stock-image-1141404.jpg"},
    {title: "Improved JavaScript and WebAssembly performance in EdgeHTML 17", image: "https://blog.educacionit.com/wp-content/uploads/2019/02/Javascript-programming-language-750x410.jpg"},
    {title: "Self-driving cars: How close are we from full autonomy?", image: "https://specials-images.forbesimg.com/imageserve/1177351973/960x0.jpg?cropX1=0&cropX2=5721&cropY1=368&cropY2=3587"},
    {title: "Kennedy Engineers Play Major Role in Mars 2020 Mission Success", image: "https://blogs.nasa.gov/kennedy/wp-content/uploads/sites/246/2020/08/Blast-off-Mars-2020-080520-1024x682.jpg"}
]*/

app.get("/", function(req, res) {
    // Initial route
    //res.send("this is intro page");
    res.render("landing");
});

app.listen(process.env.PORT, process.env.IP);
/*
app.listen(3000, '0.0.0.0', function() {
    console.log('Juan\'s Blog Site Server is running');
});
*/
