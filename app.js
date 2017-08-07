var express = require('express');
var expressSanitizer = require('express-sanitizer');
var bodyParser = require('body-parser');

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

// 3: create schema
var campgroundSchema = mongoose.Schema({
	name: String,
	image: String,
	description:String
});

// 4: declare a model and glue it to the schema
var Campground = mongoose.model("Campground", campgroundSchema );

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
			res.render('index',{campgrounds:allCampgrounds});
		}
	});
});

// NEW  displays the form to add a new campground
app.get('/new', function(req,res){
	res.render('new');
});

// SHOW  displays  a single campground
app.get('/campgrounds/:id', function(req,res){

	Campground.findById(req.params.id, function(err, campgroundItem){
		
		var campgroundResult = {campground:campgroundItem};
		
		if (err) {
			console.log('Request failed')
		} else {
			res.render('show', campgroundResult);
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



