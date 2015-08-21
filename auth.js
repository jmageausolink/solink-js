var fetch = require('node-fetch'),
	URL = require('url'),
	path = require('./path'),
	helper = require('./helper')

function AuthEndpoint(ctx) {
	this.ctx = ctx
}

var _login = function(credentials) {
	var apiContext = this.ctx;
	apiContext.credentials = credentials || apiContext.credentials

	var url = URL.resolve(_authUrl(apiContext.host), 'login'),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(apiContext.credentials)
		}

	return fetch(url, options)
		.then(_checkStatus)
		.then(_parseJSON)
		.then(function(json) { apiContext.token = json.auth_token })
		.catch(_handleError)

}

AuthEndpoint.prototype = {
	login: _login
}

module.exports = AuthEndpoint