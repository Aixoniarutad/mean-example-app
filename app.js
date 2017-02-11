require('./api/data/db.js');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var routes = require('./api/routes');

app.set('PORT', 3000);
app.set('json spaces', 2);

// Logging
app.use(function (req, res, next) {
	console.log(req.method, req.url);
	next();
});

// Set static directory for client resources
app.use(express.static(path.join(__dirname, 'public')));

// Enable parsing of posted form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add routes
app.use('/api', routes);

// Start server and listen to requests
var server = app.listen(app.get('PORT'), function () {
	var port = server.address().port;
	console.log('Listening on port: ' + port);
});