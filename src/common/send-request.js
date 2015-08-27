var fetch = require('node-fetch'),
	helper = require('./response-handlers')

function sendRequest (connection, url, options, skip) {
	if (Object.keys(connection.token).length === 0)
		login = connection.root.auth.login()
	else 
		login = Promise.resolve()

	return login.then(function() {
		options.headers.Authorization = 
			'Bearer ' + connection.token.auth_token
		return fetch(url, options)
			.then(helper.checkStatus)
			.then(function (res) {
				helper.parseJSON(res, skip)
			})
			.catch(helper.handleError)
	})
}

module.exports = sendRequest