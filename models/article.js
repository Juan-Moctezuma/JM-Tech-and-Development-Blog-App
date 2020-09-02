let mongoose = require("mongoose");
let Comment = require("./comment");

let articleSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    createdDt: {
       type: Date,
       default: Date.now
    },
    author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	 },
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ] //comments is an array of object id's but NOT comments themselves
});

module.exports = mongoose.model("Article", articleSchema);