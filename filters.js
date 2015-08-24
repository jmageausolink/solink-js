var fetch = require('node-fetch'),
	querystring = require('querystring'),
	URL = require('url'),
	path = require('./path'),
	helper = require('./helper')

function FiltersEndpoint(ctx) {
	this.ctx = ctx
}

var _find = function(params) {
	var apiContext = this.ctx,
		url = _filtersEndPtUrl(apiContext.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

		if (typeof params === 'string')
			url = URL.resolve(url, params)
		else 
			url = URL.resolve(url, '?' + querystring.stringify(params))		
	
		return fetch(url, options)
			.then(_checkStatus)
			.then(_parseJSON)
			.catch(_handleError)
}

var _create = function(filter) {
	var apiContext = this.ctx,
		url = _filtersEndPtUrl(apiContext.host),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(filter)
		}

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

var _update = function(filter) {
	var apiContext = this.ctx,
		url = _filtersEndPtUrl(apiContext.host),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(filter)
		}

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

FiltersEndpoint.prototype = {
	find: _find,
	create: _create,
	update: _update
};

module.exports = FiltersEndpoint
