angular.module('meanApp').factory('auth', AuthFactory);

function AuthFactory($http, $location, session) {
	var service = {
		isLoggedIn: isLoggedIn,
		register: register,
		logIn: logIn,
		logOut: logOut
	};
	return service;

	/**
	* Check whether the user is logged in
	* @returns boolean
	*/
	function isLoggedIn() {
		var user = session.getUser();
		return true ? user : false;
	};

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
				$location.path('/profile');
				return data;
			});
	};

	/**
	* Log out
	*
	* @returns {*|Promise}
	*/
	function logOut() {
		console.log('Logging out.');
		session.destroy();
		$location.path('/');
	};
};