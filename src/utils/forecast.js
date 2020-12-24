const request = require('request')
const forecast = ({ latitide, longitude }, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ab55dde3222964e6e20237bd8eae3b79&query=${latitide},${longitude}`

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather services", undefined)
        } else if (response.body.success === false) {
            callback("Try another lat/lon", undefined)
        } else {
            const { temperature, weather_descriptions: weather, precip: precipitation } = response.body.current
            callback(undefined, {
                temperature,
                weather,
                precipitation
            })
        }
    })
}
module.exports = forecast