global._checkStatus = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

global._parseJSON = function(response) {
  return response.json()
}

global._handleError = function(e) {
	var error = new Error(e.statusText)
    error.response = e
    throw error
}