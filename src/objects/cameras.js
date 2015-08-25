var querystring = require('querystring'),
	URL = require('url'),
	sendRequest = require('../common/send-request')
	path = require('../common/path')

function Camera(location, params) {
	this.location = location
	this.params = params
}

var _at = function (nvr_id) {
	var url = _locationsEndPtUrl(this.location.ctx.host),
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
	
	return sendRequest(this.location.ctx, url, options)
}

Camera.prototype = {
	at: _at
}

module.exports = function (params) {
	return new Camera(this, params)
}