const request = require('request');

function geocodeAddress(address, callback){
    
    //taking the address and encoding it as a uri component
    var encode_add = encodeURIComponent(address); 
    
    // Down here request method is being called with the first argument being the options arguments and the
    // second argument is the callback which gets fired when the json object comes back.
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encode_add}`,
        json:true // This converts the result into a json object automatically.
        }, (error, response, body)=>{
            if(error){
                callback("Unable to connect to the Google servers");
        } else if(body.status === "ZERO_RESULTS"){
            callback("The address you entered is invalid");
        } else if(body.status === "OVER_QUERY_LIMIT"){
            callback(body.error_message);
        } 
        else callback(undefined, {
            address : response.body.results[0].formatted_address,
            latitude: response.body.results[0].geometry.location.lat,
            longitude: response.body.results[0].geometry.location.lng
        });
        

    });
}

module.exports = {
    geocodeAddress
};