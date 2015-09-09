var fetch = require('node-fetch'),
	helper = require('./response-handlers')

function sendRequest (connection, url, options, skip) {
	var login;
	
	if (Object.keys(connection.token).length === 0)
		login = connection.root.auth.login()
	else 
		login = Promise.resolve()

	return login.then(function() {
		options.headers.Authorization = 
			'Bearer ' + connection.token.authToken
		return fetch(url, options)
			.then(helper.checkStatus)
			.then(function (res) {
				return helper.parseJSON(res, skip)
			})
	})
}

module.exports = sendRequest