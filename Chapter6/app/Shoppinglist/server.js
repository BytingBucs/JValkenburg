var express = require("express"),
	http = require("http"),
	app = express(),
	toDos = [
			{ 
				"description" : "Get groceries",
				"tags"  : [ "shopping", "chores" ]
			},
			{ 
				"description" : "Make up some new ToDos",
				"tags"  : [ "writing", "work" ]
			},
			{
				"description" : "Prep for Monday's class",
				"tags"  : [ "work", "teaching" ]
			},
			{ 
				"description" : "Answer emails",
				"tags"  : [ "work" ]
			},
			{ 
				"description"  : "Take Gracie to the park",
				"tags"  : [ "chores", "pets" ]
			},
			{ 
				"description" : "Finish writing this book",
				"tags"  : [ "writing", "work" ]
			}
		]
	
	app.use(express.static(__dirname + "/client"));
	
	
	http.createServer(app).listen(3000);
	
	app.get("/todos.json", function(req, res){
		res.json(toDos);
	});
	
	app.use(express.urlencoded());
	
	app.post("/todos", function (req, res){
		var newToDo = new toDo({"description":req.body.discription,
								"tags":req.body.tags, "stores":req.body.stores});
		
		newToDo.save(function (err, result){
			console.log(result);
			if(err !== null){
				console.log(err);
				res.json(err);
			} else{
				res.json(result);
			}
		});
	});