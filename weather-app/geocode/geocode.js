const request = require('request');

const geocodeAddress = (address, callback) => {

    //Go to http://links.mead.io/api-fix if receiving OVER_QUERY_LIMIT error
    request(
        {
            url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + addressQueryString,
            json: true
        }, (error, response, body) => {
            error
                ? callback(error, null)
                : body.status === 'ZERO_RESULTS'
                    ? console.log('Could not find requested address.')
                    : body.status !== 'OK'
                        ? console.log('Sorry, an error occurred while searching for the requested address')
                        : callback(null,
                            { address: body.results[0].formatted_address,
                              latitude: body.results[0].geometry.location.lat,
                              longitude: body.results[0].geometry.location.lng
                            });
        });
};

module.exports = { geocodeAddress };