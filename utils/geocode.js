const request = require('request')

/**
 * A function that take 2 argument, the address and the callback.
 * Make api call to mapbox and passing result to callback.
 * @param {*} address: where you want to search.
 * @param {*} callback: a function that accept 2 arguments, 1st: error, 2nd: data. 
 */
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGhvbmdodWEiLCJhIjoiY2tsYzFrZ2s5MG1pMDJ4bzNzMDQzcXdqNyJ9.Mso5H3uD6oDAyQqWDBpp8w&limit=1`;
    request({url, json: true}, (error, {body} = {}) => {
        if (error)
            return callback('Unable to connect to geocode service!', undefined);
        else if (!body.features || body.features.length === 0)
            return callback('Unable to find location. Try again!', undefined)
        const data = {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            place: body.features[0].place_name
        }
        callback(undefined, data)
    })
}

module.exports = geocode;
