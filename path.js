var URL = require('url')

var _authUrl = function(host) {
	return URL.resolve(host, 'auth/')
}

var _configurationsUrl = function(host) {
	return URL.resolve(host, 'configurations/')
}

var _eventsUrl = function(host) {
	return URL.resolve(host, 'events/')
}

var _filtersUrl = function(host) {
	return URL.resolve(host, 'filters/')
}

var _locationsUrl = function(host) {
	return URL.resolve(host, 'locations/')
}

var _usersUrl = function(host) {
	return URL.resolve(host, 'users/')
}

module.exports = {
	authUrl: _authUrl,
	configurationsUrl: _configurationsUrl,
	eventsUrl: _eventsUrl,
	filtersUrl: _filtersUrl,
	locationsUrl: _locationsUrl,
	usersUrl: _usersUrl,
}