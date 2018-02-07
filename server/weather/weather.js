const request = require('request');

var getWeather = (lat, lng, callback) =>{
    request({
    url : `https://api.darksky.net/forecast/a4d18aed3558ba7ea5f7f5cc800f7e28/${lat},${lng}`,
    json : true
},(error, response, body)=>{
    if(!error && response.statusCode === 200){
    var tempObj = {
        actTemp : body.currently.temperature ,
        appTemp : body.currently.apparentTemperature
    }; 
    callback(undefined, tempObj);
    } else {
        callback('Unable to connect to the Forecast.io servers.');
    }
  });
};

module.exports.getWeather = getWeather;