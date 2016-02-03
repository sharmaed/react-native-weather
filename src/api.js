// load open weather map information
// Ensure I can export module from here
// Convert temp into Celcius

var _ = require('lodash');

var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=e2e3f5f1ca9c4559571026bda5253e49';

var tempKtoC = function(kelvin) {
	return Math.round((kelvin-273.15));
};

module.exports = function(latitude, longitude) {
	var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
	return fetch(url)
		.then(function(response){
			return response.json();
		})
		.then(function(json){
			return {
				city: json.name,
				temp: tempKtoC(json.main.temp)  + ' ˚C',
				desc: _.capitalize(json.weather[0].description),
				tempMin: tempKtoC(json.main.temp_min),
				tempMax: tempKtoC(json.main.temp_max)

			}
		})

};