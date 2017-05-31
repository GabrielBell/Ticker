var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


// Create our app
var app = express();
const PORT = process.env.PORT || 8080;


/*app.use(function(req,res,next){
	console.log("response headers set 1: ", res.headersSent);
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	
  	
  	next();
});*/

/*app.options("*", function(req,res,next) {
	console.log("processing incoming request: ", req.headers);
	res.send(200);

	next();
});*/



app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
  

});
