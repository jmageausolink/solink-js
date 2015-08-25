var fetch = require('node-fetch'),
	URL = require('url'),
	path = require('./common/path'),
	helper = require('./common/response-handlers')

function AuthEndpoint(ctx) {
	this.ctx = ctx
}

var _login = function(credentials) {
	this.ctx.credentials = credentials || this.ctx.credentials

	var url = URL.resolve(_authEndPtUrl(this.ctx.host), 'login'),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(this.ctx.credentials)
		}

	return fetch(url, options)
		.then(_checkStatus)
		.then(_parseJSON)
		.then(function(json) { 
			this.ctx.token = json.auth_token 
			return json
		})
		.catch(_handleError)
}

var _setPassword = function (credentials) {
	var url = URL.resolve(_authEndPtUrl(this.ctx.host), 'setpassword'),
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