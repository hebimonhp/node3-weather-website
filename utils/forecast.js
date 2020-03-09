const request = require('request');

const foreCast = (lat,long, callback) => {
    const url = `https://api.darksky.net/forecast/d59c59c4a701dfd36856399ea5ebb1a9/${lat},${long}?units=si&exclude=minutely,hourly,alerts,flags`;
    request({
        url,
        json : true
    }, (error,{body}) => {
        if (error) {
            callback('Unable to reach the server', undefined);
        } else if (body.error) {
            callback("Shit happens, try again", undefined);
        } else {
            callback(undefined,body.daily.data[0].summary + " It is the currently " + body.currently.temperature + ". There is a " + body.currently.precipProbability + " chance of rain");
        }
    })
};

module.exports = foreCast;