const yargs =  require ("yargs");
const geocode = require("./server/geocode/geocode.js"); // you can omit the .js extension if you want
const weather = require('./server/weather/weather.js');

//Taking the input from the user configuring it and storing it to argv
const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
}).help().alias('help', 'h').argv;

geocode.geocodeAddress(argv.address, (errorMessage, result)=>{
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(result.address);
      weather.getWeather(result.latitude, result.longitude, (errorMessage, temperature)=>{
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`The temperature is ${temperature.actTemp}F but it feels like ${temperature.appTemp}F`);
    }
});// end of weather()
    } // end of else
});// end of geocode()

// a4d18aed3558ba7ea5f7f5cc800f7e28

