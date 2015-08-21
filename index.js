// var	AuthEndpoint = require('./auth'),
// 	ConfigurationsEndpoint = require('./configurations'),
var	EventsEndpoint = require('./events'),
	FiltersEndpoint = require('./filters')
	// LocationsEndpoint = require('./locations')
	// UsersEndpoint = require('./users')
	

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" 

function SolinkAPI(credentials, host) {
	this.host = host || 'https://api.solinkcloud.com'
	this.user = credentials
	this.events = new EventsEndpoint(this)
	this.filters = new FiltersEndpoint(this)
	this.auth = new AuthEndpoint(this)
	// this.events = new EventsEndpoint(this)
	// this.events = new EventsEndpoint(this)
	this.token = ''	
}

module.exports = SolinkAPI

