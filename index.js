var	EventsEndpoint = require('./events'),
	FiltersEndpoint = require('./filters'),
	AuthEndpoint = require('./auth')
	// ConfigurationsEndpoint = require('./configurations')
	// LocationsEndpoint = require('./locations')
	// UsersEndpoint = require('./users')
	

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" 

function SolinkAPI(credentials, host) {
	this.credentials = credentials
	this.host = host || 'https://api.solinkcloud.com'
	this.token = ''	

	this.auth = new AuthEndpoint(this)
	this.events = new EventsEndpoint(this)
	this.filters = new FiltersEndpoint(this)
	// this.configurations = new ConfigurationsEndpoint(this)
	// this.users = new UsersEndpoint(this)
}

module.exports = SolinkAPI

