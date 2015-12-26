//initializing app in express.
var express = require('express');
var app = express();

//Writing a simple hello world on localhost:4567/ Same as I use for Ruby/Sinatra
app.get('/', function (req, res) {
	res.send('Hello World!');
});

//Creating local host to display page.
var server = app.listen(4567, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Testing app listneing on http://%s:%s', host, port);
});

// Successful display of Hello World