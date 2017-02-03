angular.module('meanApp').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $q, $window, session) {
	return {
		request: request,
		response: response,
		responseError: responseError
	};

	// If JWT token is set, add it to the request header
	function request(config) {
		config.headers = config.headers || {};
		if (session.getAccessToken()) {
			config.headers.Authorization = 'Bearer ' + session.getAccessToken();
		}
		return config;
	}

	function response(response) {
		if (response.status === 200 && session.getAccessToken() && !session.isLoggedIn()) {

		}
		if (response.status === 401) {
			session.destroy();
			$location.path('/');
		}
		return response || $q.when(response);
	}

	function responseError(rejection) {
		if (rejection.status === 401 || rejection.status === 403) {
			session.destroy();
			$location.path('/');
		}
		return $q.reject(rejection);
	}
};