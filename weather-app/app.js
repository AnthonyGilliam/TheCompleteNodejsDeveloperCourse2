const request = require('request');
const yargs = require('yargs');

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

let address = userInput.address;
let addressQueryString = encodeURIComponent(address);

console.log(`\nGetting weather for ${address}:\n`);

//Go to http://links.mead.io/api-fix if receiving OVER_QUERY_LIMIT error
request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + addressQueryString,
    json: true
}, (error, response, body) => {
    error
        ? console.log(error)
        : console.log(`Address: ${body.results[0].formatted_address}\n` +
        `Latitude: ${body.results[0].geometry.location.lat}\n` +
        `Longitude: ${body.results[0].geometry.location.lng}\n`);
});