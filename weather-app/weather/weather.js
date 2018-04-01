const request = require('request');
//Dark sky API key
const apiKey = '0bedc16f7fb750da15628972ef419314';

let getWeather =(latitude, longitude, callback) => {
    request(
        {
            url: `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`,
            json: true
        }, (error, response, body) => {
            error
                ? callback(error)
                : response.statusCode != 200
                    ? console.log('Sorry, an error occurred while fetching weather.')
                    : callback(null,
                        {
                            temperature: body.currently.temperature,
                            actualTemperature: body.currently.apparentTemperature
                        });
        });
};

module.exports = { getWeather };