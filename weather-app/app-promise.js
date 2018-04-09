const yargs = require('yargs');
const axios = require('axios');

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

const addressQueryString = encodeURIComponent(userInput.address);
const geocodeUrl = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + addressQueryString;
const apiKey = '0bedc16f7fb750da15628972ef419314';

axios.get(geocodeUrl)
    .then(response => {
        if(response.data.status === 'ZERO_RESULTS')
            throw new Error('Unable to find that address.');
        let latitude = response.data.results[0].geometry.location.lat;
        let longitude = response.data.results[0].geometry.location.lng;
        let weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    })
    .then(response => {
        let temperature = response.data.currently.temperature;
        let actualTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. It feels like ${actualTemperature}.`)
    })
    .catch(err => {
        err.code === 'ENOTFOUND'
            ? console.log('Unable to connect to API servers.')
            : console.log(err)
    });