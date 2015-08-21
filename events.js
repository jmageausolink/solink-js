var fetch = require('node-fetch'),
	path = require('./path')


var _find = function() {
	var apiContext = this.ctx,
		url = path.eventsUrl(apiContext.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	if(apiContext.token == '')
		login = apiContext.auth.login()

	return login.then(function() {
		options.headers.Authorization = 
			"Bearer " + apiContext.token
		fetch(url, options)
		  .then(function(response) {
			return response.json()
		  }).then(function(json) {
		    console.log(json)
		  }).catch(function(e) {
		    console.log('JSON parsing failed', e)
		  })
	})
}

function EventsEndpoint(ctx) {
	this.ctx = ctx
}

EventsEndpoint.prototype = {
	find: _find
};

module.exports = EventsEndpoint