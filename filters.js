var fetch = require('node-fetch'),
	path = require('./path')


var find = function() {
	var url = path.filtersUrl(this.ctx.host)
		fetch(url)
		  .then(function(response) {
			return response.json()
		  }).then(function(json) {
		    console.log('parsed json', json)
		  }).catch(function(ex) {
		    console.log('parsing failed', ex)
		  })
	}

function FiltersEndpoint(ctx) {
	this.ctx = ctx
}

FiltersEndpoint.prototype = {
	find: find
};

module.exports = FiltersEndpoint
