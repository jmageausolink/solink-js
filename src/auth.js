var fetch = require('node-fetch'),
	URL = require('url'),
	jwtDecode = require('jwt-decode'),
	helper = require('./common/response-handlers')

var authUrl = function(host) {
	return URL.resolve(host, 'auth/')
}

var _login = function(credentials) {
	this.credentials = credentials || this.credentials
	var url = URL.resolve(authUrl(this.host), 'login'),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(this.credentials)
		}

	var self = this
	return fetch(url, options)
		.then(helper.checkStatus)
		.then(helper.parseJSON)
		.then(function(json) {
			self.token = json
			self.tenantId = jwtDecode(json.authToken).app_metadata.tenantId
			return json
		})
}

var _setPassword = function (credentials) {
	var url = URL.resolve(authUrl(this.host), 'setpassword'),
		options = { 
			method: 'PUT', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(credentials)
		}

	return fetch(url, options)
		.then(helper.checkStatus)
		.then(helper.parseJSON)
}

var _forgotPassword = function (credentials) {
	var url = URL.resolve(authUrl(this.host), 'forgotpassword'),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(credentials)
		}

	return fetch(url, options)
		.then(helper.checkStatus)
		.then(helper.parseJSON)
}

var _refresh = function (credentials) {
	var url = URL.resolve(authUrl(this.host), 'refresh'),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(credentials)
		}

	return fetch(url, options)
		.then(helper.checkStatus)
		.then(helper.parseJSON)
}

module.exports = function(connection) {
	return {
		login: _login.bind(connection),
		setPassword: _setPassword.bind(connection),
		forgotPassword: _forgotPassword.bind(connection),
		refresh: _refresh.bind(connection)
	}
}