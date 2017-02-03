angular.module('meanApp').factory('auth', AuthFactory);

function AuthFactory($http, $location, session) {
	var service = {
		register: register,
		logIn: logIn,
		logOut: logOut
	};
	return service;

	/**
	* Register
	*
	* @param user
	* @returns {*|Promise}
	*/
	function register(user) {
		return $http
			.post('/api/users/register', user)
			.then(function (response) {
				var data = response.data;
				session.setUser(data.user);
				session.setAccessToken(data.token);
				return data;
			});
	};

	/**
	* Log in
	*
	* @param credentials
	* @returns {*|Promise}
	*/
	function logIn(credentials) {
		return $http
			.post('/api/users/login', credentials)
			.then(function (response) {
				var data = response.data;
				session.setUser(data.user);
				session.setAccessToken(data.token);
				return data;
			});
	};

	/**
	* Log out
	*
	* @returns {*|Promise}
	*/
	function logOut() {
		console.log('Loggin out');
		session.destroy();
		$location.path('/');
	};
};