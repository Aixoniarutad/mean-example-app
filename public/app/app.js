angular.module('meanApp', ['app.routes'])
	.run(checkAccessOnStateChange)
	.run(assignServicesToRootScope);

function checkAccessOnStateChange($rootScope, $location, $window, session) {
	$rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
		if (nextRoute.access !== undefined && nextRoute.access.restricted && !session.getAccessToken() && !session.isLoggedIn()) {
			console.log('Preventing Route Change:');
			event.preventDefault();
			$location.path('/');
		}
	});
};

function assignServicesToRootScope($rootScope, auth, session) {
	$rootScope.auth = auth;
	$rootScope.session = session;
};