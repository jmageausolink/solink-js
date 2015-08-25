var fetch = require('node-fetch'),
	helper = require('./response-handlers')

function sendRequest (apiContext, url, options) {
	var login = Promise

	if(apiContext.token == '') {
		login = apiContext.auth.login()

		return login.then(function() {
				options.headers.Authorization = 
					'Bearer ' + apiContext.token

				// console.log(JSON.stringify(options, null, 2))
				return fetch(url, options)
					.then(helper.checkStatus)
					.then(helper.parseJSON)
					.catch(helper.handleError)
			})
	} else {
		options.headers.Authorization = 
					'Bearer ' + apiContext.token
		// console.log(JSON.stringify(options, null, 2))
				return fetch(url, options)
					.then(helper.checkStatus)
					.then(helper.parseJSON)
					.catch(helper.handleError)
	}
}

module.exports = sendRequest