var fetch = require('node-fetch'),
	path = require('./path')


var find = function() {
	var url = path.eventsUrl(this.ctx.host)
		fetch(url)
		  .then(function(response) {
			return response.json()
		  }).then(function(json) {
		    console.log('parsed json', json)
		  }).catch(function(ex) {
		    console.log('parsing failed', ex)
		  })
}

function EventsEndpoint(ctx) {
	this.ctx = ctx
}

EventsEndpoint.prototype = {
	find: find
};

module.exports = EventsEndpoint