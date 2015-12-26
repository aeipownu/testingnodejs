// another instance of localhost running test files. 
var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//display static Chartist chart
app.get('/chart', function(req, res) {
    res.sendFile(path.join(__dirname + '/chart.html'));
});

//set engine to render jade files. 
app.set('view engine', 'jade');

//pass simple variables to jade file
app.get('/test', function (req, res) {
  res.render('test', { title: 'Hey', message: 'Hello there!'});
});

//listen on port 8080
app.listen(8080);