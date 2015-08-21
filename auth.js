var fetch = require('node-fetch'),
	path = require('./path'),
	URL = require('url')

function AuthEndpoint(ctx) {
	this.ctx = ctx
}

var _login = function(credentials) {
	var apiContext = this.ctx;
	apiContext.credentials = credentials || apiContext.credentials

	var url = URL.resolve(path.authUrl(apiContext.host), 'login'),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(apiContext.credentials)
		}

	return fetch(url, options)
		.then(function(response) {
			return response.json()
		}).then(function(json) {
	 	 	apiContext.token = json.auth_token
		}).catch(function(e) {
	    	console.log('JSON parsing failed', e)
	  	})
}

AuthEndpoint.prototype = {
	login: _login
}

module.exports = AuthEndpoint