var fetch = require('node-fetch'),
	helper = require('./response-handlers')

function sendRequest (apiContext, url, options) {
	if(apiContext.token == '') {
		login = apiContext.auth.login()
	}

	return login.then(function() {
			options.headers.Authorization = 
				"Bearer " + apiContext.token
			return fetch(url, options)
				.then(_checkStatus)
				.then(_parseJSON)
				.catch(_handleError)
		})
}

module.exports = sendRequest