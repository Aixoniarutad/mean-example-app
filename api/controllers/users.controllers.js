var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');

module.exports.register = function (req, res) {
	console.log('Registering user: ');
	var username = req.body.username;
	var password = req.body.password;
	var name = req.body.name || null;

	User.create({
		username: username,
		password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
		name: name
	}, function (err, user) {
		if (err) {
			console.log('Error registering user: ', err);
			res
				.status(400)
				.json(err);
		} else {
			console.log('Success registering user: ', user);
			res
				.status(201)
				.json(user);
		}
	});
};

module.exports.login = function (req, res) {
	console.log('Logging in user: ');
	var username = req.body.username;
	var password = req.body.password;

	User
		.findOne({
			username: username
		})
		.exec(function (err, user) {
			var response = {
				status: 200,
				message: user
			};
			if (err) {
				console.log("Error finding user");
				response.status = 500;
				response.message = err;
			} else if (!user) {
				response.status = 404;
				response.message = {
					message: "Username not found"
				};
			} else if (bcrypt.compareSync(password, user.password)) {
				var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600 });
				response.status = 200;
				response.message = {
					user: {
						username: user.username
					},
					token: token,
					message: "User logged in successfully"
				};
			} else {
				response.status = 401;
				response.message = {
					message: "User Unauthorized"
				};
			}
			res
				.status(response.status)
				.json(response.message);
		});
};

module.exports.authenticate = function (req, res, next) {
	var headerExists = req.headers.authorization;

	if (headerExists) {
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, 's3cr3t', function (err, decoded) {
			if (err) {
				console.log('Error authentication JWT:', err);
				res
					.status(401)
					.json({ message: "Error authentication JWT:" });
			} else {
				req.user = decoded.username;
				next();
			}
		});
	} else {
		res
			.status(403)
			.json({ message: "No token provided:" });
	}
};