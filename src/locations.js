var querystring = require('querystring'),
	URL = require('url'),
	helper = require('./common/response-handlers'),
	_cameras = require('./objects/cameras'),
	sendRequest = require('./common/send-request')

var locationsUrl = function(host) {
	return URL.resolve(host, 'locations/')
}

var _find = function(params) {
	var url = locationsUrl(this.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	if (params) {
		url = URL.resolve(url, params)
	}

	return sendRequest(this, url, options)
}

var _tree = function(orgPath, depth) {
	var url = locationsUrl(this.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}
		
	url = URL.resolve(url, 'tree/' + orgPath)

	if(typeof depth !== 'undefined') {
		url = URL.resolve(url, '?depth=' + depth)
	}

	return sendRequest(this, url, options)		
}

module.exports = function(connection) {
	return {
		find: _find.bind(connection),
		tree: _tree.bind(connection),
		cameras: _cameras.bind(connection)
	}
};