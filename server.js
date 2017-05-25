var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');


// Create our app
var app = express();
const PORT = process.env.PORT || 8080;


app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
  

});
