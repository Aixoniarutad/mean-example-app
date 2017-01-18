var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res){
	console.log('GET all hotels.');
	console.log(req.query);

	var offset = req.query.offset ? parseInt(req.query.offset) : 0;
	var count = req.query.count ? parseInt(req.query.count) : 5;

	var returnData = hotelData.slice(offset, offset+count);
	res
		.status(200)
		.json( returnData );
};

module.exports.hotelsGetOne = function(req, res){
	var hotelId = req.params.hotelId
	var thisHotel = hotelData[hotelId];
	console.log('GET one hotel', hotelId);
	res
		.status(200)
		.json( thisHotel );
};

module.exports.hotelsAddOne = function(req, res){
	console.log('POST add hotel');
	console.log(req.body);
	res
		.status(200)
		.json( req.body );
};