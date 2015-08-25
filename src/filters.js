var querystring = require('querystring'),
	URL = require('url'),
	path = require('./common/path'),
	sendRequest = require('./common/send-request')

function FiltersEndpoint(ctx) {
	this.ctx = ctx
}

var _create = function(filter) {
	var url = _filtersEndPtUrl(this.ctx.host),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(filter)
		}

	return sendRequest(this.ctx, url, options)
}

var _find = function(params) {
	var url = _filtersEndPtUrl(this.ctx.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	if (typeof params === 'string') {
		url = URL.resolve(url, params)
	} else {
		url = URL.resolve(url, '?' + querystring.stringify(params))	
	}

	return sendRequest(this.ctx, url, options)
}

var _update = function(id, filter) {
	var url = URL.resolve(_filtersEndPtUrl(this.ctx.host), id),
		options = { 
			method: 'PUT', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(filter)
		}

	return sendRequest(this.ctx, url, options)
}

var _delete = function(id) {
	var url = URL.resolve(_filtersEndPtUrl(this.ctx.host), id),
		options = { 
			method: 'delete',
			headers: {}
		}

	return sendRequest(this.ctx, url, options)
}

FiltersEndpoint.prototype = {
	create: _create,
	find: _find,
	update: _update,
	delete: _delete
};

module.exports = FiltersEndpoint
