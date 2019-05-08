const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')


const app = express();

//define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Daniel Stafford'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Daniel Stafford'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Daniel Stafford',
		message: `You've come to the right place`
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}
	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		});
	}
	geocode(req.query.address, (error, {longitude, latitude, location} = {}, ) => {
		if (error) {
			return res.send({
				error
			})
		}
		forecast(latitude, longitude, (error, forecast) => {
			if (error) {
				return res.send({
					error
				})
			}
			res.send({
				location,
				forecast,
				address: req.query.address
			})
		})
	})
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help 404 page',
		name: 'Daniel Stafford',
		message: 'Help page not found'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404 page',
		name: 'Daniel Stafford',
		message: 'Page not found'
	});
});

app.listen(3000, () => {
	console.log('Sever is up on port 3000');
});
