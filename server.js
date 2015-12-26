// another instance of localhost running test files. 
var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/chart', function(req, res) {
    res.sendFile(path.join(__dirname + '/chart.html'));
});

app.listen(8080);