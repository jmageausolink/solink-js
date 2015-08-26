var fetch = require('node-fetch'),
	helper = require('./response-handlers')

function sendRequest (connection, url, options) {
	if(connection.token == '')
		login = connection.root.auth.login()
	else 
		login = Promise.resolve()

	return login.then(function() {
			options.headers.Authorization = 
				'Bearer ' + connection.token
			return fetch(url, options)
				.then(helper.checkStatus)
				.then(helper.parseJSON)
				.catch(helper.handleError)
		})
}

module.exports = sendRequest