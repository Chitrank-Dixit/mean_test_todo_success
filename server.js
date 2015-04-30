var express = require("express");
var mongojs = require("mongojs");
var db = mongojs("cs5610353",["serviceClients"]);
var app =  express();
var bodyParser = require('body-parser');
var multer = require('multer');


app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

// get for selecting or searching anything
app.get("/serviceClients", function(req, res){
	db.serviceClients.find(function(err, docs){
		res.json(docs);
	});
});

//post for inserting into the db
app.post("/serviceClients", function(req, res){
	var svc = req.body;
	console.log(svc);
	db.serviceClients.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

// get for selecting searching
app.get("/serviceClients/:id", function(req, res){
	var id = req.params.id;
	db.serviceClients.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

// put for updating
app.put("/serviceClients/:id", function(req, res){ 
	console.log(req.body);
	db.serviceClients.findAndModify({
		query: { _id: mongojs.ObjectId(req.params.id) },
		update: { $set: { name: req.body.name } },
		new: true
		},function(err, doc){
			res.json(doc)
		}
	);
});


// delete for deleting an entry from the database
app.delete("/serviceClients/:id", function(req, res){
	var id = req.params.id; // or req.params["id"]
	console.log(id);
	db.serviceClients.remove({_id : mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.listen(3000);
