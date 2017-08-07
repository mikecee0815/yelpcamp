var Mongoose = require('mongoose');

Mongoose.connect("mongodb://localhost/cat_app"); 

var catSchema = new Mongoose.Schema({
	name: String,
	age: Number
});

var Cat = Mongoose.model("Cat",catSchema);

// adding a new cat to the database
var ramon = new Cat ({
	name: "ramon",
	age:"20"
});
var ramon = new Cat ({
	name: "Bill",
	age:"45"
});

// another way to add cats to the database (EASY!!)

Cat.create({
	name: "FOO",
	age:"29"
}, function(err, newCat){
	if (err) {
		console.log("something is wrong!!");
	} else {
		console.log("sucess!!");
		console.log(newCat);
	}
});

// ramon.save(function(err, cat){
// 	if (err) {
// 		console.log("something is wrong!!");
// 	} else {
// 		console.log("sucess!!");
// 		console.log(cat);
// 	}
// });



// Retreave all cats from the database
Cat.find({},function(err,cats){

	if (err) {
		console.log("something is wrong!!");
	} else {
		console.log("ALL CATS");
		console.log(cats);
	}
})
