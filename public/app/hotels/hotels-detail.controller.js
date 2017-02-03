angular.module('meanApp').controller('HotelDetailCtrl', HotelDetailCtrl);

function HotelDetailCtrl($route, $routeParams, HotelFactory){
  var vm = this;
  var hotelId = $routeParams.hotelId;

  vm.isSubmitted = false;
  vm.getOneHotel = getOneHotel;
  vm.addReview = addReview;

  // init
  _activate();

  function _activate(){
    return getOneHotel();
  };

  function getOneHotel(){
    HotelFactory.getOneHotel(hotelId).then(function(response){
      vm.hotel = response.data;
    });
  };

  function addReview() {
    var postData = {
      name: vm.name,
      rating: vm.rating,
      review: vm.review
    };
    if (vm.reviewForm.$valid) {
      HotelFactory.addReview(hotelId, postData).then(function(response) {
        if (response.status === 201) {
          $route.reload();
        }
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      vm.isSubmitted = true;
    }
  };
};