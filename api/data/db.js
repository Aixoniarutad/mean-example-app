var mongoose = require('mongoose');
var MONGO_URL = 'mongodb://localhost:27017/mean-hotel';

mongoose.connect(MONGO_URL);

mongoose.connection.on('connected', function () {
	console.log("Mongoose connected to: " + MONGO_URL);
});
mongoose.connection.on('disconnected', function () {
	console.log("Mongoose disconnected");
});
mongoose.connection.on('error', function (err) {
	console.log("Mongoose connection error: " + err);
});

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log("Mongoose disconnected through app termination. (SIGINT)");
		process.exit(0);
	});
});
process.on('SIGTERM', function () {
	mongoose.connection.close(function () {
		console.log("Mongoose disconnected through app termination. (SIGTERM)");
		process.exit(0);
	});
});
process.once('SIGUSR2', function () {
	mongoose.connection.close(function () {
		console.log("Mongoose disconnected through app termination. (SIGUSR2)");
		process.kill(process.pid, 'SIGUSR2');
	});
});

// Bring in Schemas and Models
require('./hotels.model.js');
require('./users.model.js');