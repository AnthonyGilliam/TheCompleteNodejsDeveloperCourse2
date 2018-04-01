const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const userInput = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

console.log(`\nGetting weather for ${userInput.address}:\n`);

let longitude = null;
let latitude = null;

geocode.geocodeAddress(userInput.address, (errorMessage, results) => {
    if(errorMessage)
         console.log('Unable to connect to Google servers.');
    else {
        latitude = results.latitude;
        longitude = results.longitude;
        console.log(`Address: ${results.address}\n` +
            `Latitude: ${latitude}\n` +
            `Longitude: ${longitude}\n`);
        weather.getWeather(latitude, longitude, (errorMessage, results) => {
            if(errorMessage)
                console.log('Unable to connect to darksky.net.')
            else
                console.log(`It is ${results.temperature}ºF, but if feels like ${results.actualTemperature}`);
    })}
});