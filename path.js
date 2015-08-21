var _authUrl = function(host) {
	return host + '/auth'
}

var _configurationsUrl = function(host) {
	return host + '/configurations'
}

var _eventsUrl = function(host) {
	return host + '/events'
}

var _filtersUrl = function(host) {
	return host + '/filters'
}

var _locationsUrl = function(host) {
	return host + '/locations'
}

var _usersUrl = function(host) {
	return host + '/users'
}

module.exports = {
	authUrl: _authUrl,
	configurationsUrl: _configurationsUrl,
	eventsUrl: _eventsUrl,
	filtersUrl: _filtersUrl,
	locationsUrl: _locationsUrl,
	usersUrl: _usersUrl,
}