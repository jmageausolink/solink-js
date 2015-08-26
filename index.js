var	EventsEndpoint = require('./src/events'),
	FiltersEndpoint = require('./src/filters'),
	AuthEndpoint = require('./src/auth')
	UsersEndpoint = require('./src/users')
	LocationsEndpoint = require('./src/locations')	

// Remove this once we get a certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" 

function SolinkAPI(params, host) {
	if (typeof params === 'string') {
		this.token = params
	} else {
		this.credentials = params
		this.token = ''	
	}
	this.host = host || 'https://api.solinkcloud.com'
	this.auth = require('./src/auth')(this)
	this.events = require('./src/events')(this)
	this.filters = require('./src/filters')(this)
	this.users = require('./src/users')(this)
	this.locations = require('./src/locations')(this)
}

module.exports = SolinkAPI

