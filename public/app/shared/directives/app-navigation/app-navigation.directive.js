angular.module('meanApp').component('appNavigation', {
	templateUrl: 'app/shared/directives/app-navigation/app-navigation.html',
	controller: NavController,
	controllerAs: 'vm'
});

function NavController($location, auth, session) {
	var vm = this;
	vm.logIn = logIn;
	vm.logOut = logOut;
	vm.isLoggedIn = isLoggedIn;
	vm.isActiveTab = isActiveTab;

	function logIn() {
		var user = {
			username: vm.username,
			password: vm.password
		};
		auth.logIn(user).then(function (response) {
			console.log('Logging in:', response);
		});
	};

	function logOut() {
		return auth.logOut();
	};

	function isLoggedIn() {
		return session.isLoggedIn();
	};

	function isActiveTab(url) {
		var currentPath = $location.path().split('/')[1];
		return (url === currentPath ? 'active' : '');
	};
};