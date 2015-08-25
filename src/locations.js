var fetch = require('node-fetch'),
	querystring = require('querystring'),
	URL = require('url'),
	_cameras = require('./objects/cameras'),
	path = require('./common/path'),
	helper = require('./common/response-handlers')

function LocationsEndpoint(ctx) {
	this.ctx = ctx
}

var _find = function(params) {
	var url = _locationsEndPtUrl(this.ctx.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	if (params)
		url = URL.resolve(url, params)

	return sendRequest(this.ctx, url, options)
}

var _tree = function(orgPath, depth) {
	var url = _locationsEndPtUrl(this.ctx.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}
		
	url = URL.resolve(url, 'tree/' + orgPath)

	if(typeof depth !== 'undefined')
		url = URL.resolve(url, '?depth=' + depth)

	return sendRequest(this.ctx, url, options)		
}

LocationsEndpoint.prototype = {
	find: _find,
	tree: _tree,
	cameras: _cameras
};

module.exports = LocationsEndpoint