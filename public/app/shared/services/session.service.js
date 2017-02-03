angular.module('meanApp').factory('session', SessionFactory);

function SessionFactory($log, $window) {
	// Instantiate data when service is loaded
	var _user = JSON.parse($window.localStorage.getItem('session.user'));
	var _accessToken = JSON.parse($window.localStorage.getItem('session.accessToken'));

	var service = {
		getUser: getUser,
		setUser: setUser,
		getAccessToken: getAccessToken,
		setAccessToken: setAccessToken,
		destroy: destroy
	};
	return service;

	function getUser() {
		return _user;
	};

	function setUser(user) {
		_user = user;
		$window.localStorage.setItem('session.user', JSON.stringify(user));
		return;
	};

	function getAccessToken() {
		return _accessToken;
	};

	function setAccessToken(token) {
		_accessToken = token;
		$window.localStorage.setItem('session.accessToken', JSON.stringify(token));
		return;
	};

	/**
	 * Destroy session
	 */
	function destroy() {
		setUser(null);
		setAccessToken(null);
		$window.localStorage.removeItem('session.user');
		$window.localStorage.removeItem('session.accessToken');
	};
};