# Solink API client
NPM module to serve as an intermediary client for all calls to the SolinkAPI

### Usage
```JavaScript
var SolinkAPI = require('solink-api-client')
var api = new SolinkAPI({ 
	'email' : 'integrationtestuser+1@solinkcorp.com', 
	'password' : 'password'})
	
var event = {}
solinkAPI.events.create(event)
	.then(function (ev) {
		console.log('created', ev)
	}).then(function() {
		solinkAPI.events.find(event._id).then(function(res) {
			console.log('retrieved', res)
		})
	})

```

