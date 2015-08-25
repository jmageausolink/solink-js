var fetch = require('node-fetch'),
	URL = require('url'),
	helper = require('./common/response-handlers')

function AuthEndpoint(context) {
	this.parent = context
	this.authUrl = authUrl(context.host)
}

var authUrl = function(host) {
	return URL.resolve(host, 'auth/')
}

var _login = function(credentials) {
	var parentContext = this.parent
	parentContext.credentials = credentials || parentContext.credentials
	var url = URL.resolve(this.authUrl, 'login'),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(parentContext.credentials)
		}
	return fetch(url, options)
		.then(helper.checkStatus)
		.then(helper.parseJSON)
		.then(function(json) {
			parentContext.token = json.auth_token
			return json
		})
		.catch(helper.handleError)
}

var _setPassword = function (credentials) {
	var url = URL.resolve(this.authUrl, 'setpassword'),
		options = { 
			method: 'PUT', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(credentials)
		}

	return fetch(url, options)
		.then(helper.checkStatus)
		.then(helper.parseJSON)
		.catch(helper.handleError)
}

AuthEndpoint.prototype = {
	login: _login,
	setPassword: _setPassword
}

module.exports = AuthEndpoint