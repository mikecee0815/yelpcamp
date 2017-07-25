var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs' );
app.listen(3000,function(){
	console.log('YelpCamp server ready...');
});

var campgrounds = [
	
	{
		name:"Big Bo's campground", 
		image: "http://rv-camping.org/wp-content/uploads/2015/06/USACECampground.jpg"
	},

	{
		name:"Big Bo's campground", 
		image: "http://rv-camping.org/wp-content/uploads/2015/06/USACECampground.jpg"
	},

	{
		name:"Big Bo's campground", 
		image: "http://rv-camping.org/wp-content/uploads/2015/06/USACECampground.jpg"
	},

	{
		name:"Big Bo's campground", 
		image: "http://rv-camping.org/wp-content/uploads/2015/06/USACECampground.jpg"
	},

	{
		name:"Big Bo's campground", 
		image: "http://rv-camping.org/wp-content/uploads/2015/06/USACECampground.jpg"
	},

	{	
		name:"Marleny's Campground", 
		image: "http://21zfbaky162t2fou2u3pmsri4-wpengine.netdna-ssl.com/wp-content/uploads/2013/04/20121023_151802.jpg"
	},

	{	
		name:"LIL Mike's Campground", 
		image: "http://www.campjellystone.com/wp/wp-content/uploads/2012/08/IllinoisCamping1.jpg"
	},

	{	
		name:"Green Path Campground", 
		image: "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5276184.jpg"
	}

	];



//routes
app.get('/', function(req,res){
	res.render('landing');
});

app.get('/campgrounds', function(req,res){
	
	res.render('campgrounds',{campgrounds:campgrounds});
});

app.get('/new', function(req,res){
	res.render('new');
});

app.post('/campgrounds', function(req,res){
	
	// get data from form and store it in variables
	var name = req.body.name;
	var image = req.body.image;

	var newCampground = {name:name, image:image}
	campgrounds.push(newCampground);
	console.log(campgrounds);
	
	// redirect back to landing page
	res.redirect('/campgrounds');
});



