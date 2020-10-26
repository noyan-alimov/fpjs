const axios = require('axios');

const APPID = 'a2adda676ea3cad6bbeba93ebfcbba31';

const weatherUrl = (city) => {
	return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
		city
	)}&units=imperial&APPID=${APPID}`;
};

const url = weatherUrl('Paris');

const request = { url };

const promise = axios(request);

const success = (response) => {
	console.log(JSON.stringify(response.data, null, 2));
};

const error = (err) => {
	console.log(JSON.stringify(err.response.data, null, 2));
};

promise.then(success, error);
