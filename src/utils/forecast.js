const request = require('request');

const forecast = (latitude, longitude, callback) => {
    console.log(longitude);
    const url =
        'https://api.darksky.net/forecast/98ee2e2c80720aaaeed57fb08ad2366b/' +
        latitude +
        ',' +
        longitude +
        '?units=si&lang=sv';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect', undefined);
        } else if (body.error) {
            callback('unable to find location', undefined);
        } else {
            console.log(body.daily.data[0]);
            callback(
                undefined,
                body.daily.data[0].summary +
                    ' Temp: ' +
                    body.currently.temperature +
                    '. Risk of rain: ' +
                    body.currently.precipProbability +
                    '. UV-index is: ' +
                    body.daily.data[0].uvIndex,
            );
        }
    });
};

module.exports = forecast;
