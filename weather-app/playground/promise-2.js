const request = require('request');

const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let addressQueryString = encodeURIComponent(address);
        //Go to http://links.mead.io/api-fix if receiving OVER_QUERY_LIMIT error
        request(
            {
                url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + addressQueryString,
                json: true
            }, (error, response, body) => {
                error
                    ? reject(error)
                    : body.status === 'ZERO_RESULTS'
                        ? reject('Could not find requested address.')
                        : body.status !== 'OK'
                            ? reject('Sorry, an error occurred while searching for the requested address')
                            : resolve(
                                {
                                    address: body.results[0].formatted_address,
                                    latitude: body.results[0].geometry.location.lat,
                                    longitude: body.results[0].geometry.location.lng
                                });
            });
    });
};

geocodeAddress('30297')
    .then(location => console.log(JSON.stringify(location, undefined, 2)))
    .catch(err => console.log('Error: ', err));