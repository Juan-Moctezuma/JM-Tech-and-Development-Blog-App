let mongoose = require("mongoose");
let Comment = require("./comment");

// BLOG POST'S MONGODB SCHEMA / STRUCTURE
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
    // COMMENT'S ARE ARRAYS THAT DEPEND ON AUTHOR (LIKE PARENT-TO-CHILD RELATIONSHIP)
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ]
});

module.exports = mongoose.model("Article", articleSchema);
