var fetch = require('node-fetch'),
	path = require('./path'),
	URL = require('url'),
	querystring = require('querystring')

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function returnJSON(json) {
  return json
}

function EventsEndpoint(ctx) {
	this.ctx = ctx
}

function handleError(e) {
	console.log('err', e)
}

var _find = function(params) {

	var apiContext = this.ctx,
		url = path.eventsUrl(apiContext.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	if (typeof params === 'string')
		url = URL.resolve(url, params)
	else if(typeof params === 'object') {
		url = URL.resolve(url, '?' + querystring.stringify(params))
	}

	if(apiContext.token == '')
		login = apiContext.auth.login()

	return login.then(function() {
		options.headers.Authorization = 
			"Bearer " + apiContext.token
		return fetch(url, options)
			.then(checkStatus)
			.then(parseJSON)
			.then(returnJSON)
			.catch(handleError)
	})
}

var _create = function(event) {
	var apiContext = this.ctx,
		url = path.eventsUrl(apiContext.host),
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
			.then(function (response) {
				return response.headers.get('link')			
			}).catch(handleError)
	})
}

EventsEndpoint.prototype = {
	find: _find,
	create: _create
};

module.exports = EventsEndpoint