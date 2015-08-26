// Remove this once we get a certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" 

function Connection(params, host, root) {
	if (typeof params === 'string') {
		this.token = params
	} else {
		this.credentials = params
		this.token = ''	
	}
	this.host = host || 'https://api.solinkcloud.com'
	this.root = root
}

function SolinkAPI(params, host) {
	var connection = new Connection(params, host, this)
	this.auth = require('./src/auth')(connection)
	this.filters = require('./src/filters')(connection)
	this.events = require('./src/events')(connection)
	this.users = require('./src/users')(connection)
	this.locations = require('./src/locations')(connection)
}

module.exports = SolinkAPI

