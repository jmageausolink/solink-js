var URL = require('url')

global._authEndPtUrl = function(host) {
	return URL.resolve(host, 'auth/')
}

global._configurationsEndPtUrl = function(host) {
	return URL.resolve(host, 'configurations/')
}

global._eventsEndPtUrl = function(host) {
	return URL.resolve(host, 'events/')
}

global._filtersEndPtUrl = function(host) {
	return URL.resolve(host, 'filters/')
}

global._locationsEndPtUrl = function(host) {
	return URL.resolve(host, 'locations/')
}

global._usersEndPtUrl = function(host) {
	return URL.resolve(host, 'users/')
}