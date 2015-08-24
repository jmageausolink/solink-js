var fetch = require('node-fetch'),
	querystring = require('querystring'),
	URL = require('url'),
	path = require('./path'),
	helper = require('./helper')

function EventsEndpoint(ctx) {
	this.ctx = ctx
}

var _find = function(params) {
	var apiContext = this.ctx,
		url = _eventsEndPtUrl(apiContext.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	if (typeof params === 'string')
		url = URL.resolve(url, params)
	else {
		url = URL.resolve(url, '?' + querystring.stringify(params))
	}

	if(apiContext.token == '')
		login = apiContext.auth.login()

	return login.then(function() {
		options.headers.Authorization = 
			"Bearer " + apiContext.token
		return fetch(url, options)
			.then(_checkStatus)
			.then(_parseJSON)
			.catch(_handleError)
	})
}

var _create = function(event) {
	var apiContext = this.ctx,
		url = _eventsEndPtUrl(apiContext.host),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(event)
		}

	if(apiContext.token == '')
		login = apiContext.auth.login()

	return login.then(function () {
		options.headers.Authorization = 
			"Bearer " + apiContext.token

		return fetch(url, options)
			.then(function (res) { return res.headers.get('link') })
			.catch(_handleError)
	})
}

EventsEndpoint.prototype = {
	find: _find,
	create: _create
};

module.exports = EventsEndpoint