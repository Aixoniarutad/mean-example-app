angular.module('meanApp').controller('HotelListCtrl', HotelListCtrl);

function HotelListCtrl($routeParams, HotelFactory) {
	var vm = this;
	var offset = $routeParams.offset || 0;
	var count = $routeParams.count || 10;

	vm.hotels = [];
	vm.getAllHotels = getAllHotels;

	// init
	_activate();

	function _activate() {
		return getAllHotels();
	};

	function getAllHotels() {
		HotelFactory.getAllHotels(offset, count).then(function (response) {
			vm.hotels = response.data;
		})
		.catch(function (err) {
			console.log(err);
		});
	};
};