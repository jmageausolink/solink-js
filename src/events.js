var fetch = require('node-fetch'),
	querystring = require('querystring'),
	URL = require('url'),
	path = require('./common/path'),
	helper = require('./common/response-handlers'),
	sendRequest = require('./common/send-request')

function EventsEndpoint(ctx) {
	this.ctx = ctx
}

var _find = function(params) {
	var url = _eventsEndPtUrl(this.ctx.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	if (typeof params === 'string')
		url = URL.resolve(url, params)
	else 
		url = URL.resolve(url, '?' + querystring.stringify(params))	

	return sendRequest(this.ctx, url, options)
}

var _create = function(ev) {
	var url = _eventsEndPtUrl(this.ctx.host),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(ev)
		}

	return sendRequest(this.ctx, url, options)
}

var _histogram = function(params) {
	var url = URL.resolve(_eventsEndPtUrl(this.ctx.host), 'histogram'),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

		url = URL.resolve(url, '?' + querystring.stringify(params))

	return sendRequest(this.ctx, url, options)
}

EventsEndpoint.prototype = {
	find: _find,
	create: _create,
	histogram: _histogram
};

module.exports = EventsEndpoint