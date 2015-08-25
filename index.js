var	EventsEndpoint = require('./events'),
	FiltersEndpoint = require('./filters'),
	AuthEndpoint = require('./auth')
	UsersEndpoint = require('./users')
	LocationsEndpoint = require('./locations')
	// ConfigurationsEndpoint = require('./configurations')
	

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" 

function SolinkAPI(credentials, host) {
	this.credentials = credentials
	this.host = host || 'https://api.solinkcloud.com'
	this.token = ''	

	this.auth = new AuthEndpoint(this)
	this.events = new EventsEndpoint(this)
	this.filters = new FiltersEndpoint(this)
	this.users = new UsersEndpoint(this)
	this.locations = new LocationsEndpoint(this)
	// this.configurations = new ConfigurationsEndpoint(this)
}

module.exports = SolinkAPI

