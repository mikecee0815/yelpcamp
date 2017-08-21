
var mongoose = require('mongoose');

// 1: create  campground schema
var campgroundSchema = mongoose.Schema({
	name: String,
	image: String,
	description:String,
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]

});

// 2: Make a campground model and glue it to the schema
module.exports = mongoose.model("Campground", campgroundSchema );