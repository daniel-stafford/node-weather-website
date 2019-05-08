const request = require('request')

const forecast = (longitude, latitude, callback) => {
	const key = '41731643b9179263c67b3765f59931db';
	const url = `https://api.darksky.net/forecast/${key}/${longitude},${latitude}?units=si&lang=en`
	request({
		url,
		json: true
	}, (error, { body}) => {
		if (error) {
			callback('Unable to connect to geocode service', undefined)
		} else if (body.error) {
			callback('Unable to find location. Try another search', undefined)
		} else {
			callback(undefined, `${body.daily.data[0].summary} It is currently ${
					body.currently.temperature} degrees out. There is a ${
			body.currently.precipProbability}% chance of rain`)
		}
	})
}

module.exports = forecast
