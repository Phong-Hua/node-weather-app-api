const request = require('request')
const geocode = require('./geocode')

const getForecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3442561d95e5c7244b4b35c26fe3e5a7&query=${latitude},${longitude}`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error)
            return callback('Unable to connect to forecast service!', undefined)
        else if (body.error)
            return callback(body.error.info, undefined)
        const { temperature, feelslike, weather_descriptions, precip: precipitation } = body.current;
        const forecastData = `The weather is ${weather_descriptions.join(', ')}. It is ${temperature} degrees out and feels like ${feelslike} degrees. There is a ${precipitation}% chance of rain.`;
        return callback(undefined, forecastData)
    })
}

/**
 * Call the weatherstack api and passing result into the callback.
 * @param {*} address 
 * @param {*} callback : accept 3 arguments: 1st: error, 2nd: place, 3rd: forecastData.
 */
const forecast = (address, callback) => {
    geocode(address, (error, { latitude, longitude, place } = {}) => {
        if (error)
            return callback(error)
        getForecast(latitude, longitude, (error, forecastData) => {
            callback(error, place, forecastData)
        });
    })
}

module.exports = forecast;