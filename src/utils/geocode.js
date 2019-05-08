const request = require('request')

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZHN0YWZmb3JkIiwiYSI6ImNqdWdvMDl4bDBuaHM0M3BnM3BpZmI1Ym8ifQ.AW5IKJKcQq2_7bMyTR60Qg`
	request({
		url: url,
		json: true
	}, (error, response) => {
		if (error) {
			callback('Unable to connect to geocode service')
		} else if (response.body.features.length === 0) {
			callback('Unable to find location. Try another search')
		} else {
			callback(undefined, {
				longitude: response.body.features[0].center[0],
				latitude: response.body.features[0].center[1],
				location: response.body.features[0].place_name
			})
		}
	})
}

module.exports = geocode;
