var mongoose = require('mongoose');

// 1: create  comment schema
var commentSchema = mongoose.Schema(
	{
	text: String,
	author: String
	}
);

// 2: Make a comment model 
module.exports = mongoose.model("Comment", commentSchema );