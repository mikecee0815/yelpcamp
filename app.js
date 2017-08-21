var express = require('express');
var expressSanitizer = require('express-sanitizer');
var bodyParser = require('body-parser');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');

// express handle
var app = express();

// 1: add database library
var mongoose = require('mongoose');

// 2: connect to the database
mongoose.connect ("mongodb://localhost/yelpcamp");


app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.set('view engine','ejs' );
app.listen(3000,function(){
	console.log('YelpCamp server ready...');
});

seedDB();



// 5: create a campground entry
// Campground.create(
// 	{
// 		name:"Vida Guerra's Camp Hill", 
// 		image: "http://ll-media.tmz.com/2015/02/10/vida-guerra-sexy-thong-bikini-photos-013-480w.jpg",
// 		description:"Vida's Booty shot"
// 	},function(err, campground){
// 		if (err) {
// 			console.log("something went wrong");
// 		} else {
// 			console.log("Entry campground added");
// 			console.log(campground);
// 		}
// 	})

// ROUTES =======================================

// Displays all campgrounds 
app.get('/campgrounds', function(req,res){

	Campground.find({} ,function(err, allCampgrounds){
		if (err) {
			console.log('something went wrong');	
		} else {
			res.render('campgrounds/index',{campgrounds:allCampgrounds});
		}
	});
});

// NEW  displays the form to add a new campground
app.get('/new', function(req,res){
	res.render('campgrounds/new');
});

// SHOW  displays  a single campground
app.get('/campgrounds/:id', function(req,res){

	Campground.findById(req.params.id).populate("comments").exec( function(err, campgroundItem){
		
		var campgroundResult = {campground:campgroundItem};
		
		if (err) {
			console.log('Request failed')
		} else {
			res.render('campgrounds/show', campgroundResult);
		}
	})
	
});

// POST adds a new single campground
app.post('/campgrounds', function(req,res){

	// get data from form and store it in variables
	var name = req.body.name;
	var image = req.body.image;

	// sanitize the form body object
	req.body.description = req.sanitize(req.body.description );
	
	var description = req.body.description;

	var newCampground = {name:name, image:image, description:description}

	// creates a new campground and save to database
	Campground.create(newCampground, function(err, newCamp){
		
		if (err) {
			console.log('something went wrong');	
		} else{
			// redirect back to landing page
			res.redirect('/campgrounds');
		}	
	});	
});

//============================
// Comments Routes

app.get("/campgrounds/:id/comments/new", function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if (err) {
			console.log(err);
		} else{
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments",function(req,res){
	
	// lookup campground by Id
	Campground.findById(req.params.id,function(err,campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else{
			// create a new comment
			Comment.create(req.body.comment, function(err,comment){
				if (err) 	{
					console.log(err);
				} else {
					// ascociate new comment to the campground found
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});	
		}
	});
});

//============================



