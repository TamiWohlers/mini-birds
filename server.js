//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');

var app = express();
app.use(bodyParser.json());

//Run mongod
var db = mongojs('birds', ['sightings']);
// var port = [mongod port from cmd];
var nodeport = 8090;

//app.post()
app.post('/api/sighting', function(req, res){
	db.sightings.insert(req.body, function(err,result){
		if(err){
			return res.status(500).json(err);
		}
		else{
			return res.json(result);
		}

	})
	console.log('post hit')
})
app.get('/api/sighting', function(req, res){
	console.log(req.query);
	db.sightings.find(req.query, function(err, bird){
	if(!err) {
      res.json(bird);
	}
	else {
		res.status(500).json(err)
	}
	});
    console.log('get hit');
})
app.delete('/api/sighting', function(req, res){
	db.sightings.remove(req.query, function(err, result){
		if(!err){
			res.json(result);
	    }
	    else {
	    	res.status(500).json(err)
	    }
	});
    console.log('delete hit');
})
app.put('/api/sighting', function(req, res){
	db.sightings.update(req.query, req.body, function(err,result){	
		if(err)res.status(500).json(err);
			else res.json(result);
	});
    console.log('put hit');
})
app.listen(nodeport, function() {
  console.log("listening on... ", nodeport)
})