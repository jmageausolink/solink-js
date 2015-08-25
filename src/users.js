var querystring = require('querystring'),
	URL = require('url')

function UsersEndpoint (ctx) {
	this.ctx = ctx
}

var usersUrl = function(host) {
	return URL.resolve(host, 'users/')
}

var _create = function(user) {
	var url = usersUrl(this.ctx.host),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(user)
		}

	return sendRequest(this.ctx, url, options)
}

var _find = function(params) {
	var url = usersUrl(this.ctx.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	if (typeof params === 'string'){
		url = URL.resolve(url, params)
	} else {
		url = URL.resolve(url, '?' + querystring.stringify(params))		
	}

	return sendRequest(this.ctx, url, options)
}

var _delete = function(id) {
	var url = URL.resolve(usersUrl(this.ctx.host), id),
		options = { 
			method: 'delete',
			headers: {}
		}

	return sendRequest(this.ctx, url, options)
}

UsersEndpoint.prototype = {
	create: _create,
	find: _find,
	delete: _delete
};

module.exports = UsersEndpoint