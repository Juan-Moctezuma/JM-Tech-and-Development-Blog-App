let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

// USER & PASSWORD MONGODB SCHEMA / STRUCTURE
let UserSchema = new mongoose.Schema({
	username: String,
    	password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
