angular.module('meanApp').component('starRating', {
	bindings: {
		score: '='
	},
	template: '<span ng-repeat="star in vm.calcScore(vm.score) track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
	controller: starRatingController,
	controllerAs: 'vm'
});

function starRatingController() {
	var vm = this;
	vm.calcScore = calcScore;

	function calcScore(score) {
		return new Array(score);
	};
};