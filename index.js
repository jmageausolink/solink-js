var	EventsEndpoint = require('./endpoints/events'),
	FiltersEndpoint = require('./endpoints/filters'),
	AuthEndpoint = require('./endpoints/auth')
	UsersEndpoint = require('./endpoints/users')
	LocationsEndpoint = require('./endpoints/locations')	

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" 

function SolinkAPI(params, host) {

	if (typeof params === 'string')
		this.token = params
	else {
		this.credentials = params
		this.token = ''	
	}

	this.host = host || 'https://api.solinkcloud.com'

	this.auth = new AuthEndpoint(this)
	this.events = new EventsEndpoint(this)
	this.filters = new FiltersEndpoint(this)
	this.users = new UsersEndpoint(this)
	this.locations = new LocationsEndpoint(this)
}

module.exports = SolinkAPI

