const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoibWxrYzE5OTYiLCJhIjoiY2tpemtzaWZmMDg4cDJycGh3ZXJ0b2twciJ9.oU4Wfz5vmwuRofRFwhcgyw`


    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to geocode services!", undefined)
        } else if (response.body.features.length === 0) {
            callback("Try another location", undefined)
        } else {
            const { features } = response.body
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode