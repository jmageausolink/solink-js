var URL = require('url')

global._authUrl = function(host) {
	return URL.resolve(host, 'auth/')
}

global._configurationsUrl = function(host) {
	return URL.resolve(host, 'configurations/')
}

global._eventsUrl = function(host) {
	return URL.resolve(host, 'events/')
}

global._filtersUrl = function(host) {
	return URL.resolve(host, 'filters/')
}

global._locationsUrl = function(host) {
	return URL.resolve(host, 'locations/')
}

global._usersUrl = function(host) {
	return URL.resolve(host, 'users/')
}