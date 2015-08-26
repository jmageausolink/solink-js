var fetch = require('node-fetch'),
	helper = require('./response-handlers')

function sendRequest (connection, url, options) {
	// var login = Promise

	if(connection.token == '' || true) {
		login = connection.root.auth.login()

	return login.then(function() {
			options.headers.Authorization = 
				'Bearer ' + connection.token
			return fetch(url, options)
				.then(helper.checkStatus)
				.then(helper.parseJSON)
				.catch(helper.handleError)
		})
	} else {
		options.headers.Authorization = 
					'Bearer ' + connection.token
		return fetch(url, options)
			.then(helper.checkStatus)
			.then(helper.parseJSON)
			.catch(helper.handleError)
	}
}

module.exports = sendRequest