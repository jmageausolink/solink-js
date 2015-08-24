var fetch = require('node-fetch'),
	querystring = require('querystring'),
	URL = require('url'),
	path = require('./path'),
	helper = require('./helper')

function UsersEndpoint (ctx) {
	this.ctx = ctx
}

var _create = function(user) {
	var apiContext = this.ctx,
		url = _usersEndPtUrl(apiContext.host),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(user)
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

var _find = function(params) {
	var apiContext = this.ctx,
		url = _usersEndPtUrl(apiContext.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

		if (typeof params === 'string')
			url = URL.resolve(url, params)
		else 
			url = URL.resolve(url, '?' + querystring.stringify(params))		
	
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

var _delete = function(id) {
	var apiContext = this.ctx,
		url = URL.resolve(_usersEndPtUrl(apiContext.host), id),
		options = { 
			method: 'delete',
			headers: {}
		}

	if(apiContext.token == '') 
		login = apiContext.auth.login()

	return login.then(function () {
		options.headers.Authorization = 
			"Bearer " + apiContext.token

		return fetch(url, options)
			.then(_checkStatus)
			.catch(_handleError)
	})
}
UsersEndpoint.prototype = {
	create: _create,
	find: _find,
	delete: _delete
};

module.exports = UsersEndpoint