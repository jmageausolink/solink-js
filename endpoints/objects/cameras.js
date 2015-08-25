var fetch = require('node-fetch'),
	querystring = require('querystring'),
	URL = require('url'),
	path = require('../common/path'),
	helper = require('../common/response-handlers')

function Camera(location, params) {
	this.location = location
	this.params = params
}

var _cameras = function (params) {
	return new Camera(this, params)
}

var _at = function (nvr_id) {
	var apiContext = this.location.ctx,
		url = _locationsEndPtUrl(apiContext.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

		url = URL.resolve(url, nvr_id + '/cameras/')

		if (typeof this.params === 'string')
			url = URL.resolve(url, this.params)
		else 
			url = URL.resolve(url, '?' + querystring.stringify(this.params))		
	
		if(apiContext.token == '')
			login = apiContext.auth.login()

		return login.then(function () {
			options.headers.Authorization = 
				"Bearer " + apiContext.token
			return fetch(url, options)
				.then(_checkStatus)
				.then(_parseJSON)
				.catch(_handleError)
		})
}

Camera.prototype = {
	at: _at
};

module.exports = _cameras