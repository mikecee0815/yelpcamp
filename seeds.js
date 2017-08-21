var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var Data = [
	
	{
		name: "mike's path",
		image: "http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg",
		description:"Lorem ipsum dolor sit amet."
	},

	{
		name: "Cat Mountain",
		image: "http://www.campsalemsd.com/campground.jpg",
		description:"Lorem ipsum dolor sit amet."
	},

	{
		name: "Dolly Park",
		image: "http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx",
		description:"Lorem ipsum dolor sit amet."
	}	
];

function seedDB(){
	
	// Remove all campgrounds
	Campground.remove({},function(err){
	
	if (err) {
		console.log("Error ocurred");
	}
	console.log("Data removed");
	
	//seed data
	Data.forEach(function(seed){
		
		Campground.create(seed,function(err,campground){
			if (err) {
				console.log(err);
			} else{
				console.log('campground added');
				
				Comment.create(
				{
					text: "Wifi is very fast",
					author: "Bo Parker"
				} ,function(err,comment){
					if (err){
						console.log('There was a problem');
					} else {
						//console.log(comment + 'added');
						campground.comments.push(comment);
						campground.save();
					}
				});

			}
		});
	});
		
	});

	
}

module.exports =seedDB;