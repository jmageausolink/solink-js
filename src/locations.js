var querystring = require('querystring'),
	URL = require('url'),
	helper = require('./common/response-handlers'),
	_cameras = require('./objects/cameras')

function LocationsEndpoint(ctx) {
	this.ctx = ctx
}

var locationsUrl = function(host) {
	return URL.resolve(host, 'locations/')
}

var _find = function(params) {
	var url = locationsUrl(this.ctx.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

	if (params) {
		url = URL.resolve(url, params)
	}

	return sendRequest(this.ctx, url, options)
}

var _tree = function(orgPath, depth) {
	var url = locationsUrl(this.ctx.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}
		
	url = URL.resolve(url, 'tree/' + orgPath)

	if(typeof depth !== 'undefined') {
		url = URL.resolve(url, '?depth=' + depth)
	}

	return sendRequest(this.ctx, url, options)		
}

LocationsEndpoint.prototype = {
	find: _find,
	tree: _tree,
	cameras: _cameras
};

var Singleton = (function () {
    var instance;
 
    function createInstance(ctx) {
        return new LocationsEndpoint(ctx)
    }
 
    return {
        getInstance: function (ctx) {
            return instance || ( instance = createInstance(ctx) )
        }
    };
})()

module.exports = Singleton.getInstance