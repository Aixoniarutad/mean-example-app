angular.module('app.routes', ['ngRoute'])
	.config(config);

function config($httpProvider, $routeProvider, $locationProvider) {

	// Url hash prefix
	$locationProvider.hashPrefix('');

	// Auth Interceptor
	$httpProvider.interceptors.push('AuthInterceptor');

	// App Routes
	$routeProvider
		.when('/', {
			templateUrl: 'app/home/home.html'
		})
		.when('/hotels', {
			templateUrl: 'app/hotels/hotels-list.html',
			controller: 'HotelListCtrl',
			controllerAs: 'vm'
		})
		.when('/hotels/:hotelId', {
			templateUrl: 'app/hotels/hotels-detail.html',
			controller: 'HotelDetailCtrl',
			controllerAs: 'vm'
		})
		.when('/register', {
			templateUrl: 'app/register/register.html',
			controller: 'RegisterCtrl',
			controllerAs: 'vm'
		})
		.when('/profile', {
			templateUrl: 'app/profile/profile.html',
			controller: 'ProfileCtrl',
			controllerAs: 'vm',
			access: {
				restricted: true
			}
		})
		.otherwise({
			redirectTo: '/'
		});
};