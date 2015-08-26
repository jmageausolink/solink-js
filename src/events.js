var querystring = require('querystring'),
	URL = require('url'),
	sendRequest = require('./common/send-request')

function EventsEndpoint(ctx) {
	this.ctx = ctx
}

var eventsUrl = function(host) {
	return URL.resolve(host, 'events/')
}

var _find = function(params) {
	var url = eventsUrl(this.ctx.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	if (typeof params === 'string') {
		url = URL.resolve(url, params)
	} else {
		url = URL.resolve(url, '?' + querystring.stringify(params))	
	}

	return sendRequest(this.ctx, url, options)
}

var _create = function(ev) {
	var url = eventsUrl(this.ctx.host),
		options = { 
			method: 'POST', 
			headers: { 'content-type': 'application/json'},
			body: JSON.stringify(ev)
		}

	return sendRequest(this.ctx, url, options)
}

var _histogram = function(params) {
	var url = URL.resolve(eventsUrl(this.ctx.host), 'histogram'),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	url = URL.resolve(url, '?' + querystring.stringify(params))

	return sendRequest(this.ctx, url, options)
}

EventsEndpoint.prototype = {
	find: _find,
	create: _create,
	histogram: _histogram
};

var Singleton = (function () {
    var instance;
 
    function createInstance(ctx) {
        return new EventsEndpoint(ctx)
    }
 
    return {
        getInstance: function (ctx) {
            return instance || ( instance = createInstance(ctx) )
        }
    };
})()

module.exports = Singleton.getInstance