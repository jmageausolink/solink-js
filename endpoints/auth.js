var fetch = require('node-fetch'),
	URL = require('url'),
	path = require('./common/path'),
	helper = require('./common/response-handlers')

function AuthEndpoint(ctx) {
	this.ctx = ctx
}

var _login = function(credentials) {
	var apiContext = this.ctx;
	apiContext.credentials = credentials || apiContext.credentials

	var url = URL.resolve(_authEndPtUrl(apiContext.host), 'login'),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(apiContext.credentials)
		}

	return fetch(url, options)
		.then(_checkStatus)
		.then(_parseJSON)
		.then(function(json) { 
			apiContext.token = json.auth_token 
			return json
		})
		.catch(_handleError)
}

var _setPassword = function (credentials) {
	var apiContext = this.ctx;

	var url = URL.resolve(_authEndPtUrl(apiContext.host), 'setpassword'),
		options = { 
			method: 'PUT', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(credentials)
		}

	return fetch(url, options)
		.then(_checkStatus)
		.then(_parseJSON)
		.catch(_handleError)
}

AuthEndpoint.prototype = {
	login: _login,
	setPassword: _setPassword
}

module.exports = AuthEndpoint