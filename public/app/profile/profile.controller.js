angular.module('meanApp').controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl(session) {
	var vm = this;
	vm.user = session.getUser();
};