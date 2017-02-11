angular.module('meanApp').directive('appNavigation', function () {
	return {
		templateUrl: 'app/shared/directives/app-navigation/app-navigation.html',
		controller: NavController,
		controllerAs: 'vm'
	};
});

function NavController($location, auth, session) {
	var vm = this;
	vm.user = session.getUser();
	vm.logIn = logIn;
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

	function isActiveTab(url) {
		var currentPath = $location.path().split('/')[1];
		return (url === currentPath ? 'active' : '');
	};
};