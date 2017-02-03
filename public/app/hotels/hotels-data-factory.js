angular.module('meanApp').factory('HotelFactory', HotelFactory);

function HotelFactory($http){

  var service = {
    getAllHotels: getAllHotels,
    getOneHotel: getOneHotel,
    addReview: addReview,
  };
  return service;

  function getAllHotels(offset, count){
    return $http.get('/api/hotels' + '?offset='+ offset + '&count=' + count)
      .then(_success)
      .catch(_error);
  };

  function getOneHotel(hotelId){
    return $http.get('/api/hotels/' + hotelId)
      .then(_success)
      .catch(_error);
  };

  function addReview(hotelId, review) {
    return $http.post('/api/hotels/' + hotelId + '/reviews', review)
      .then(_success)
      .catch(_error);
  };

  function _success(response){
    console.log('success: ', response);
    return response;
  };
  function _error(err){
    console.log('error: ', err);
    return;
  };
};