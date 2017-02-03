angular.module('meanApp').factory('session', SessionFactory);

function SessionFactory($log, $window) {
	// Instantiate data when service is loaded
	var localStorage = $window.localStorage;
	var _user = localStorage.getItem('session.user');
	var _accessToken = localStorage.getItem('session.accessToken');
	console.log('_user', _user);
	console.log('_accessToken', _accessToken);

	var service = {
		isLoggedIn: isLoggedIn,
		getUser: getUser,
		setUser: setUser,
		getAccessToken: getAccessToken,
		setAccessToken: setAccessToken,
		destroy: destroy
	};
	return service;

	/**
	* Check whether the user is logged in
	* @returns boolean
	*/
	function isLoggedIn() {
		return _user !== null;
	};

	function getUser() {
		return _user;
	};

	function setUser(user) {
		_user = user;
		localStorage.setItem('session.user', JSON.stringify(user));
		return;
	};

	function getAccessToken() {
		return _accessToken;
	};

	function setAccessToken(token) {
		_accessToken = token;
		localStorage.setItem('session.accessToken', token);
		return;
	};

	/**
	 * Destroy session
	 */
	function destroy() {
		setUser(null);
		setAccessToken(null);
	};
};