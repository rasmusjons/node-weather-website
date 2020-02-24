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
            callback(
                undefined,
                body.daily.data[0].summary +
                    ' temp: ' +
                    body.currently.temperature +
                    ' rain risk: ' +
                    body.currently.precipProbability,
            );
        }
    });
};

module.exports = forecast;
