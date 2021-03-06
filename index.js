//Palindromer main entry file. 
//Creates server and routes

var express = require('express'),
	bodyParser = require('body-parser'),
	mongo = require('./mongo'),
    messages = require('./routes/messages'),
	config = require('./config');

//Express
var app = express();
module.exports = app;
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

//Enable CORS for preflight requests
app.all('/api/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');

  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'accept, content-type');
    res.header('Access-Control-Max-Age', '1728000');
    res.status(200).end();
  }
  else{
    res.setHeader('Content-Type', 'application/json');

    res.on('finish', function(){
        console.log('Responded to '+req.method+" "+req.route.path+' with '+res.statusCode);
    });

    next();
  }
});

//Routes
app.get('/api/messages', messages.getAllMessages);
app.post('/api/messages', messages.addMessage);
app.get('/api/messages/:id', messages.getMessage);
app.delete('/api/messages/:id', messages.removeMessage)

//Error handler
app.use(function(err, req, res, next){
    console.error(err.stack);

	if(config.debug){
		res.status(500).send({message: err.message + '\n' + err.stack});
	}
	else{
		//Respond to client with 500. If routes specified message then send that - otherwise send genric error
		res.status(500).send({message: res.message ? res.message:"Uh oh! Something went wrong."});
	}
});

//Start Server
app.listen(config.port);
console.log('Listening on port '+config.port+' ('+config.env+" mode)");