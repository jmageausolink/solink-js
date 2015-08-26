var querystring = require('querystring'),
	URL = require('url'),
	sendRequest = require('../common/send-request')

function Camera(location, params) {
	this.location = location
	this.params = params
}

var locationsUrl = function(host) {
	return URL.resolve(host, 'locations/')
}

var _at = function (nvr_id) {
	var url = locationsUrl(this.location.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	url = URL.resolve(url, nvr_id + '/cameras/')

	if (typeof this.params === 'string') {
		url = URL.resolve(url, this.params)
	} else {
		url = URL.resolve(url, '?' + querystring.stringify(this.params))		
	}
	
	return sendRequest(this.location, url, options)
}

Camera.prototype = {
	at: _at
}

module.exports = function (params) {
	return new Camera(this, params)
}